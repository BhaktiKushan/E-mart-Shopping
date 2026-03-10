import { Link, useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { allProducts } from '../utils/allProducts'
import { useStore } from '../context/StoreContext'

const SearchResults = () => {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const query = (params.get('q') || '').trim().toLowerCase()
  const { addToCart } = useStore()

  const results = allProducts.filter((item) => {
    const hay = `${item.product} ${item.company || ''} ${item.brand || ''} ${item.model}`.toLowerCase()
    return query ? hay.includes(query) : false
  })

  return (
    <>
      <Navbar />
      <div className='list-page'>
        <h2>Search Results for "{query}"</h2>
        {results.length === 0 ? (
          <p>No items found.</p>
        ) : (
          <div className='prosection'>
            {results.map((item) => (
              <div key={item.uniqueId}>
                <Link to={`${item.routeBase}/${item.id}`}>
                  <div className='proimage'>
                    <img src={item.image} alt={item.model} />
                  </div>
                </Link>
                <h3>{item.displayName}</h3>
                <p>${item.price}</p>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default SearchResults
