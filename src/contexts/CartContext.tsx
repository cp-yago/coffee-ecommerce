import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react'
import { increaseProductQuantity, decreaseProductQuantity, removeProduct } from '../reducers/shopping/actions'
import { cartReducer, CartState } from '../reducers/shopping/reducer'
import { listProducts, Product } from '../services/api'

interface CartContextType {
  products: Product[],
  cart: CartState,
  handleIncreaseProductQuantity: (productId: number) => void
  handleDecreaseProductQuantity: (productId: number) => void
  handleRemoveProductFromCart: (productId: number) => void
  onSubmit: (data: any) => void
}

export const CartContext = createContext({} as CartContextType)

interface CartContextProviderProps {
  children: ReactNode
}

const initialState: CartState = {
  products: [],
  freigthPrice: 0,
  paymentMethod: 'creditCard'
}

export function CartContextProvider({
  children
}: CartContextProviderProps) {

  const [products, setProducts] = useState<Product[]>([])

  const [cartState, dispatch] = useReducer(
    cartReducer,
    initialState,
  )

  const handleIncreaseProductQuantity = (productId: number) => {
    const product = products.find((product) => product.id === productId)
    if (product) dispatch(increaseProductQuantity(product))
  }

  const handleDecreaseProductQuantity = (productId: number) => {
    dispatch(decreaseProductQuantity(productId))
  }

  const handleRemoveProductFromCart = (productId: number) => {
    dispatch(removeProduct(productId))
  }

  const fetchProducts = async () => {
    const coffees = await listProducts()
    setProducts(coffees)
  }

  const onSubmit = (data: any) => console.log(data);

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    console.log('debug cartState: ', cartState)
  }, [cartState])

  return (
    <CartContext.Provider value={{
      products,
      cart: cartState,
      handleIncreaseProductQuantity,
      handleDecreaseProductQuantity,
      handleRemoveProductFromCart,
      onSubmit
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  const context = useContext(CartContext)
  return context
}