import Dashboard from '../../pages/Dashboard';
import { DEFAULT_RECORD_ID } from '../../api/config'

export default function Main() {

   return (
      <main className='main-content mt-3 mt-lg-5'>
         <Dashboard recordId={DEFAULT_RECORD_ID} />
      </main>
   );
}
