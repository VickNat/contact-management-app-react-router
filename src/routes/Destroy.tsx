import { ActionFunction, redirect } from 'react-router-dom'
import { deleteContact } from '../contacts'

/**
 * Action function for the delete option
 * 
 * @param param0 contactId
 * @returns a redirect to the main page
 */
export const action: ActionFunction = async ({ params }) => {
  await deleteContact(params.contactId)
  return redirect('/')
}

// const Destroy: React.FC = () => {

//   const { contactId } = useParams()
//   const navigate = useNavigate();
  
//   useEffect(() => {
//     action({
//       params: { contactId: contactId },
//       request: new Request('dummy-url')
//     })

//     navigate("/")
//   }, [contactId, navigate])

//   return (
//     <div>Destroy</div>
//   )
// }

// export default Destroy