import { UIInput, UISelect } from '../components/ui'
import UserTable from '../components/users/UserTable'

const mockUsers = [
   { id: '1', name: 'Alice Rossi', position: 'Frontend Developer', department: 'Engineering', email: 'alice.rossi@example.com', phone: '345-123-4567', avatar: 'https://i.pravatar.cc/80?img=1', notes: 'Lavora sul team principale di UI/UX.' },
   { id: '2', name: 'Bruno Bianchi', position: 'Product Manager', department: 'Product', email: 'bruno.bianchi@example.com', phone: '345-987-6543', avatar: 'https://i.pravatar.cc/80?img=2', notes: 'Focus su roadmap e comunicazione con stakeholders.' },
   { id: '3', name: 'Carla Verdi', position: 'Designer', department: 'Design', email: 'carla.verdi@example.com', avatar: 'https://i.pravatar.cc/80?img=3', notes: 'Specializzata in brand identity e illustrazione.' },
]

export default function Dashboard() {
   return (
      <div className="section">
         <div className="container">
            <div className="row">
               <div className="col-md-4">
                  <UIInput label="Searchbar" placeholder="Search..." />
               </div>

               <div className="col-md-4">
                  <UISelect
                     label="Filters"
                     options={[
                        { value: 'option1', label: 'Option 1' },
                        { value: 'option2', label: 'Option 2' },
                        { value: 'option3', label: 'Option 3' },
                     ]}
                  />
               </div>

               <div className="col-md-12 mt-5">
                  <div className="grid-container">
                     <UserTable
                        users={mockUsers}
                        onEdit={(id) => alert(`Edit ${id}`)}
                        onDelete={(id) => alert(`Delete ${id}`)}
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
