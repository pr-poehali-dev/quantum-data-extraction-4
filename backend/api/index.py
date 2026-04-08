import json
import os
import psycopg2


CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}


def ok(data: dict) -> dict:
    return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(data, ensure_ascii=False)}


def err(msg: str, code: int = 400) -> dict:
    return {'statusCode': code, 'headers': CORS, 'body': json.dumps({'error': msg}, ensure_ascii=False)}


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def handler(event: dict, context) -> dict:
    """
    Единый API для маркетплейса.
    GET  /orders           — список заказов (админка)
    POST /orders           — создать заказ
    POST /supplier-apply   — заявка поставщика
    """

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    path = (event.get('path') or '/').rstrip('/')
    method = event.get('httpMethod', 'GET')

    # ── ORDERS ──────────────────────────────────────────────────────────────
    if path.endswith('/orders'):

        if method == 'GET':
            conn = get_conn()
            cur = conn.cursor()
            cur.execute("""
                SELECT id, product_name, supplier, quantity, total_price,
                       customer_name, customer_phone, delivery_type,
                       delivery_address, payment_type, status, created_at
                FROM t_p41823543_quantum_data_extract.orders
                ORDER BY created_at DESC LIMIT 200
            """)
            cols = ['id','product_name','supplier','quantity','total_price',
                    'customer_name','customer_phone','delivery_type',
                    'delivery_address','payment_type','status','created_at']
            orders = []
            for row in cur.fetchall():
                d = dict(zip(cols, row))
                d['created_at'] = d['created_at'].isoformat() if d['created_at'] else None
                orders.append(d)
            cur.close(); conn.close()
            return ok({'orders': orders})

        if method == 'POST':
            body = json.loads(event.get('body') or '{}')
            required = ['product_id','product_name','quantity','price_num',
                        'total_price','customer_name','customer_phone',
                        'delivery_type','payment_type']
            for f in required:
                if body.get(f) is None:
                    return err(f'Поле {f} обязательно')
            conn = get_conn()
            cur = conn.cursor()
            cur.execute("""
                INSERT INTO t_p41823543_quantum_data_extract.orders
                (product_id, product_name, supplier, quantity, price_num, total_price,
                 customer_name, customer_phone, delivery_type, delivery_address,
                 payment_type, status)
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,'new') RETURNING id
            """, (
                body['product_id'], body['product_name'], body.get('supplier',''),
                body['quantity'], body['price_num'], body['total_price'],
                body['customer_name'], body['customer_phone'],
                body['delivery_type'], body.get('delivery_address',''),
                body['payment_type'],
            ))
            order_id = cur.fetchone()[0]
            conn.commit(); cur.close(); conn.close()
            return ok({'success': True, 'order_id': order_id})

    # ── SUPPLIER APPLY ───────────────────────────────────────────────────────
    if path.endswith('/supplier-apply') and method == 'POST':
        body = json.loads(event.get('body') or '{}')
        name = (body.get('name') or '').strip()
        company = (body.get('company') or '').strip()
        email = (body.get('email') or '').strip()
        if not name or not company or not email:
            return err('Заполните обязательные поля: имя, компания, email')
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO t_p41823543_quantum_data_extract.supplier_applications
            (name, company, email, phone, category, message)
            VALUES (%s,%s,%s,%s,%s,%s) RETURNING id
        """, (name, company, email,
              body.get('phone',''), body.get('category',''), body.get('message','')))
        app_id = cur.fetchone()[0]
        conn.commit(); cur.close(); conn.close()
        return ok({'success': True, 'id': app_id})

    return err('Not found', 404)
