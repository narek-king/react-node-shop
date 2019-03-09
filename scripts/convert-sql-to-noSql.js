
import * as mysql from 'mysql2/promise'
import winston from 'winston';
import url from 'url';
import { MongoClient } from 'mongodb';
import settings from '../src/api/server/lib/settings';

const mongodbConnection = settings.mongodbServerUrl;
const mongoPathName = url.parse(mongodbConnection).pathname;
const dbName = mongoPathName.substring(mongoPathName.lastIndexOf('/') + 1);

const CONNECT_OPTIONS = {
    useNewUrlParser: true
};

const DEFAULT_LANGUAGE = 'english';

const addPage = async (db, pageObject) => {
    const count = await db
    .collection('pages')
    .countDocuments({ slug: pageObject.slug });
    const docExists = +count > 0;
    if (!docExists) {
        await db.collection('pages').insertOne(pageObject);
        winston.info(`- Added page: /${pageObject.slug}`);
    }
};

const addAllPages = async db => {
    await addPage(db, {
        slug: '',
        meta_title: 'Home',
        enabled: true,
        is_system: true
    });
    await addPage(db, {
        slug: 'checkout',
        meta_title: 'Checkout',
        enabled: true,
        is_system: true
    });
    await addPage(db, {
        slug: 'checkout-success',
        meta_title: 'Thank You!',
        enabled: true,
        is_system: true
    });
    await addPage(db, {
        slug: 'about',
        meta_title: 'About us',
        enabled: true,
        is_system: false
    });
};

const addAllProducts = async (db, products) => {

    const productsCount = await db.collection('products').countDocuments({});

    const productsNotExists = productsCount === 0;

    if (productsNotExists) {
        await  db.collection('products').insertMany(products);

        winston.info('- Added products');
    }
};

const addAllCategories = async (db, categories) => {

    const categoriesCount = await db.collection('categories').countDocuments({});

    const categoriesNotExists = categoriesCount === 0;

    if (categoriesNotExists) {
        await  db.collection('categories').insertMany(categories);

        winston.info('- Added categories');
    }
};

const addAllDepartments = async (db, departments) => {

    const departmentsCount = await db.collection('departments').countDocuments({});

    const departmentsNotExists = departmentsCount === 0;

    if (departmentsNotExists) {
        await  db.collection('departments').insertMany(departments);

        winston.info('- Added departments');
    }
};

const addEmailTemplates = async db => {
    const emailTemplatesCount = await db
    .collection('emailTemplates')
    .countDocuments({ name: 'order_confirmation' });
    const emailTemplatesNotExists = emailTemplatesCount === 0;
    if (emailTemplatesNotExists) {
        await db.collection('emailTemplates').insertOne({
            name: 'order_confirmation',
            subject: 'Order confirmation',
            body: `<div>
			<div><b>Order number</b>: {{number}}</div>
			<div><b>Shipping method</b>: {{shipping_method}}</div>
			<div><b>Payment method</b>: {{payment_method}}</div>
		  
			<div style="width: 100%; margin-top: 20px;">
			  Shipping to<br /><br />
			  <b>Full name</b>: {{shipping_address.full_name}}<br />
			  <b>Address 1</b>: {{shipping_address.address1}}<br />
			  <b>Address 2</b>: {{shipping_address.address2}}<br />
			  <b>Postal code</b>: {{shipping_address.postal_code}}<br />
			  <b>City</b>: {{shipping_address.city}}<br />
			  <b>State</b>: {{shipping_address.state}}<br />
			  <b>Phone</b>: {{shipping_address.phone}}
			</div>
		  
			<table style="width: 100%; margin-top: 20px;">
			  <tr>
				<td style="width: 40%; padding: 10px 0px; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; text-align: left;">Item</td>
				<td style="width: 25%; padding: 10px 0px; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; text-align: right;">Price</td>
				<td style="width: 10%; padding: 10px 0px; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; text-align: right;">Qty</td>
				<td style="width: 25%; padding: 10px 0px; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; text-align: right;">Total</td>
			  </tr>
		  
			  {{#each items}}
			  <tr>
				<td style="padding: 10px 0px; border-bottom: 1px solid #ccc; text-align: left;">{{name}}<br />{{variant_name}}</td>
				<td style="padding: 10px 0px; border-bottom: 1px solid #ccc; text-align: right;">$ {{price}}</td>
				<td style="padding: 10px 0px; border-bottom: 1px solid #ccc; text-align: right;">{{quantity}}</td>
				<td style="padding: 10px 0px; border-bottom: 1px solid #ccc; text-align: right;">$ {{price_total}}</td>
			  </tr>
			  {{/each}}
		  
			</table>
		  
			<table style="width: 100%; margin: 20px 0;">
			  <tr>
				<td style="width: 80%; padding: 10px 0px; text-align: right;"><b>Subtotal</b></td>
				<td style="width: 20%; padding: 10px 0px; text-align: right;">$ {{subtotal}}</td>
			  </tr>
			  <tr>
				<td style="width: 80%; padding: 10px 0px; text-align: right;"><b>Shipping</b></td>
				<td style="width: 20%; padding: 10px 0px; text-align: right;">$ {{shipping_total}}</td>
			  </tr>
			  <tr>
				<td style="width: 80%; padding: 10px 0px; text-align: right;"><b>Grand total</b></td>
				<td style="width: 20%; padding: 10px 0px; text-align: right;">$ {{grand_total}}</td>
			  </tr>
			</table>
		  
		  </div>`
        });

        winston.info('- Added email template for Order Confirmation');
    }
};

const addShippingMethods = async (db, shippingMethods) => {
    const shippingMethodsCount = await db
    .collection('shippingMethods')
    .countDocuments({});
    const shippingMethodsNotExists = shippingMethodsCount === 0;
    if (shippingMethodsNotExists) {
        await db.collection('shippingMethods').insertMany(shippingMethods);
        winston.info('- Added shipping method');
    }
};

const addPaymentMethods = async db => {
    const paymentMethodsCount = await db
    .collection('paymentMethods')
    .countDocuments({});
    const paymentMethodsNotExists = paymentMethodsCount === 0;
    if (paymentMethodsNotExists) {
        await db.collection('paymentMethods').insertOne({
            name: 'PayPal',
            enabled: true,
            conditions: {
                countries: [],
                shipping_method_ids: [],
                subtotal_min: 0,
                subtotal_max: 0
            }
        });
        winston.info('- Added payment method');
    }
};

const createIndex = (db, collectionName, fields, options) =>
    db.collection(collectionName).createIndex(fields, options);

const createAllIndexes = async db => {
    const pagesIndexes = await db
    .collection('pages')
    .listIndexes()
    .toArray();

    if (pagesIndexes.length === 1) {
        await createIndex(db, 'pages', { enabled: 1 });
        await createIndex(db, 'pages', { slug: 1 });
        winston.info('- Created indexes for: pages');
    }

    const productCategoriesIndexes = await db
    .collection('categories')
    .listIndexes()
    .toArray();

    if (productCategoriesIndexes.length === 1) {
        await createIndex(db, 'categories', { enabled: 1 });
        await createIndex(db, 'categories', { slug: 1 });
        winston.info('- Created indexes for: categories');
    }

    const productsIndexes = await db
    .collection('products')
    .listIndexes()
    .toArray();

    if (productsIndexes.length === 1) {
        await createIndex(db, 'products', { slug: 1 });
        await createIndex(db, 'products', { enabled: 1 });
        await createIndex(db, 'products', { category_id: 1 });
        await createIndex(db, 'products', { sku: 1 });
        await createIndex(db, 'products', {
            'attributes.name': 1,
            'attributes.value': 1
        });
        await createIndex(
            db,
            'products',
            {
                name: 'text',
                description: 'text'
            },
            { default_language: DEFAULT_LANGUAGE, name: 'textIndex' }
        );
        winston.info('- Created indexes for: products');
    }

    const customersIndexes = await db
    .collection('customers')
    .listIndexes()
    .toArray();

    if (customersIndexes.length === 1) {
        await createIndex(db, 'customers', { group_id: 1 });
        await createIndex(db, 'customers', { email: 1 });
        await createIndex(db, 'customers', { mobile: 1 });
        await createIndex(
            db,
            'customers',
            {
                full_name: 'text',
                'addresses.address1': 'text'
            },
            { default_language: DEFAULT_LANGUAGE, name: 'textIndex' }
        );
        winston.info('- Created indexes for: customers');
    }

    const ordersIndexes = await db
    .collection('orders')
    .listIndexes()
    .toArray();

    if (ordersIndexes.length === 1) {
        await createIndex(db, 'orders', { draft: 1 });
        await createIndex(db, 'orders', { number: 1 });
        await createIndex(db, 'orders', { customer_id: 1 });
        await createIndex(db, 'orders', { email: 1 });
        await createIndex(db, 'orders', { mobile: 1 });
        await createIndex(
            db,
            'orders',
            {
                'shipping_address.full_name': 'text',
                'shipping_address.address1': 'text'
            },
            { default_language: DEFAULT_LANGUAGE, name: 'textIndex' }
        );
        winston.info('- Created indexes for: orders');
    }
};

const addUser = async (db, userEmail) => {
    if (userEmail && userEmail.includes('@')) {
        const tokensCount = await db.collection('tokens').countDocuments({
            email: userEmail
        });
        const tokensNotExists = tokensCount === 0;

        if (tokensNotExists) {
            await db.collection('tokens').insertOne({
                is_revoked: false,
                date_created: new Date(),
                expiration: 72,
                name: 'Owner',
                email: userEmail,
                scopes: ['admin']
            });
            winston.info(`- Added token with email: ${userEmail}`);
        }
    }
};

const addSettings = async (db, { domain }) => {
    if (domain && (domain.includes('https://') || domain.includes('http://'))) {
        await db.collection('settings').updateOne(
            {},
            {
                $set: {
                    domain
                }
            },
            { upsert: true }
        );
        winston.info(`- Set domain: ${domain}`);
    }
};


const sqlConnect = async () => {
    return await mysql.createConnection(settings.sqlServer);
};

const getProductsFromSql = async (connection) => {
    let result = [];
    const [products, fields] = await connection.execute('SELECT * FROM `product` WHERE 1');
    for (let product of products) {
        let current = product;
        current.attributes = await getAttributes(connection, product.product_id);
        current.category_id = await getCategory(connection, product.product_id);
        current.slug = generateSlug(product.name);
        current.enabled = true;
        current.stock_quantity = 1;
        result.push(current);
    }
    return result;
};

const updateProductCategoryIndexes = async db => {
    const categories = await db.collection('categories').find({}).toArray();
    for (let cat of categories) {
      await db.collection('products').updateMany(
        { category_id: cat.category_id },
        { $set: { category_id: cat._id }}
      )
    }
};
const getAttributes = async (connection, productId) => {
    const [row, fields] = await  connection.execute(
        'SELECT `attribute_value`.`value`, `attribute`.`name` FROM `attribute_value` INNER JOIN `attribute` ON `attribute_value`.`attribute_id` = `attribute`.`attribute_id` WHERE `attribute_value`.`attribute_value_id` in (SELECT `attribute_value_id` FROM `product_attribute` WHERE `product_id` = ?)',
        [productId]);
    return row;
};
const getCategory = async (connection, productId) => {
    const [row, field] = await connection.execute('SELECT `category_id` FROM `product_category` WHERE `product_id` = ? LIMIT 1', [productId]);
    return row[0].category_id;
};
const getCategoriesFromSql = async connection => {
    const [rows, field] = await connection.execute('SELECT * FROM `category` WHERE 1');
    rows.map(row => {
        row.slug = generateSlug(row.name);
        row.enabled = true;
    });
    return rows;
};
const getDepartmentsFromSql = async connection => {
    const [rows, field] = await connection.execute('SELECT * FROM `department` WHERE 1');
    return rows;
};

const getShippingMethods = async connection => {
    const [rows, fields] = await connection.execute('SELECT `shipping_type`, `shipping_cost`, `shipping_region`.`shipping_region` FROM `shipping` RIGHT JOIN `shipping_region` ON `shipping`.`shipping_region_id` = `shipping_region`.`shipping_region_id`');
    return rows;
}
const generateSlug = str => {
    return str.replace(/\s+/g, '-').toLowerCase();
};

const main = async () => {
    let client = null;
    let db = null;
    let sqlConnection = null;

    try {
        sqlConnection = await sqlConnect();
        winston.info(`Successfully connected to MySQL server`);
    } catch (e) {
        winston.error(`MySQL connection was failed. ${e.message}`);
        return;
    }

    try {
        client = await MongoClient.connect(
            mongodbConnection,
            CONNECT_OPTIONS
        );
        db = client.db(dbName);
        winston.info(`Successfully connected to ${mongodbConnection}`);
    } catch (e) {
        winston.error(`MongoDB connection was failed. ${e.message}`);
        return;
    }
    //
    const userEmail = process.argv.length > 2 ? process.argv[2] : null;
    const domain = process.argv.length > 3 ? process.argv[3] : null;

    const products = await getProductsFromSql(sqlConnection);
    const categories = await getCategoriesFromSql(sqlConnection);
    const departments = await getDepartmentsFromSql(sqlConnection);
    const shippingMethods = await getShippingMethods(sqlConnection);

    await db.createCollection('customers');
    await db.createCollection('orders');
    await addAllPages(db);
    await addAllProducts(db, products);
    await addAllCategories(db, categories);
    await addAllDepartments(db, departments);
    await addEmailTemplates(db);
    await addShippingMethods(db, shippingMethods);
    await addPaymentMethods(db);
    await createAllIndexes(db);
    await updateProductCategoryIndexes(db);
    await addUser(db, userEmail);
    await addSettings(db, {
        domain
    });

    client.close();

    sqlConnection.end();
};

main();