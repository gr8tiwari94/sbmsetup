import {useLoaderData} from 'react-router';

export async function loader({context}) {
  const {storefront} = context;

  const {products} = await storefront.query(`
    query HomeProducts {
      products(first: 10) {
        nodes {
          id
          title
          handle
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `);

  // ✅ IMPORTANT: return plain object
  return {products};
}

export default function Home() {
  const {products} = useLoaderData();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-6">Featured Products</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.nodes.map((product) => (
          <a
            key={product.id}
            href={`/products/${product.handle}`}
            className="border p-3 rounded"
          >
            <img
              src={product.featuredImage?.url}
              alt={product.featuredImage?.altText}
            />
            <h2 className="mt-2 font-medium">{product.title}</h2>
            <p>₹{product.priceRange.minVariantPrice.amount}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
