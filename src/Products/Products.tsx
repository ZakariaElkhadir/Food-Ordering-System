import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import './Products.scss'
import ProductsItem from './ProductsItem'
const Products = () => {
    return (
        <div className="products">
            
            <Header/>
            <h2>Products Page</h2>
            <ProductsItem/>
            <Footer/>
        </div>
    )
}
export default Products