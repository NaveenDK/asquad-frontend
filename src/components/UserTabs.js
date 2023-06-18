import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import cycles from '../data/cycles'
import {useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import EditableLabel from 'react-editable-label';


function NavTabs (props){
  return (
            <Nav.Item>
             <Nav.Link eventKey={props.id}  > {props.firstName}  </Nav.Link>
           </Nav.Item>
           ) 
}


function EditableListItem(props){

  return (
    <ul>
            <li>   <EditableLabel
                initialValue={'World'}
                save={value => {
                    console.log(`Saving '${value}'`);
                }}
            /> </li>
            <ul>
            <EditableLabel
                initialValue={'World'}
                save={value => {
                    console.log(`Saving '${value}'`);
                }}
            />
            </ul>
            
      </ul>
  )
}

function ListGoals(props){


  const [sbTasks,setsbTask] = useState([
    "task1", "task2", <EditableLabel
    initialValue={'Add SubTask'}
    save={value => {
        console.log(`Saving '${value}'`);
    }}
  />
  ])
  const [customId,setCustomId] = useState()
 
  
  const addGoal= () => {
    let newGoal =  <EditableLabel
    initialValue={'Add Goal'}
    save={value => {
        console.log(`Saving '${value}'`);
    }}
  />

     
}
  return (
    <>
      <ul>
            <li>{props.maingoal}</li>
            <ul>
              {props.subtasksArray.map((st,i)=><li key={i}>{st}</li>)}
            </ul>
            
      </ul>
      {/* <ul>
        <li>{props.mainCustomGoal}</li>
        <ul>
        {props.mainCustomSubTask}
        </ul>
      </ul> */}
    </>
  )
}
//need to have an array for editable main goals
//
function TabPanes (props){
  const [newMainGoals,setMainGoal] = useState([ "default"] )

  const addGoal = () => {
    let newGoal = "New Goal"

    setMainGoal([...newMainGoals, newGoal])
}

const removeGoal = (index) => {
  let data = [...newMainGoals];
  data.splice(index, 1)
  setMainGoal(data)
}
 

  return (    
    <Tab.Pane   eventKey={props.id}>{props.goalArr.map(e=>
      
    <ListGoals key={e.goal_id}maingoal={e.goalMain} subtasksArray={e.subTasks }  
         
    />  
  
    )}
    {
      newMainGoals.map((index,g)=>{
        return (<>
        <Row>
          <Col>
          <EditableListItem/>
          </Col>
          <Col>
          <button   className="btn btn-danger minusMember" onClick={() => removeGoal(index)}>- </button>
          </Col>
        </Row>
      
        
        </>
        
        )
       
      } )

    }
     

    <div className="plusMember">
        <button  onClick={addGoal}type="button" className="btn btn-dark plusMember"> +</button>
    </div>
   
    </Tab.Pane>
  )
}

function UserTabs() {
  let {id_cycle} = useParams()
  console.log("id_cycle : " + id_cycle )
  
    return (
      <>
          {/* <h5 className="customTitle"> Cycle Period {cycles[id_cycle-1].startDate} - {cycles[id_cycle-1].endDate }</h5> */}
              <Tab.Container id="left-tabs-example" defaultActiveKey={cycles[id_cycle-1].owners[0].name.firstName}>
                  <Row>
                    <Col sm={3}>
                      <Nav variant="tabs" className="flex-column customTabNavs">
                        {cycles[id_cycle - 1].owners.map(current => {
                          return <NavTabs key={current.name.firstName}id={current.name.firstName} firstName={current.name.firstName} />;
                        })}

                      </Nav>
                    </Col>
                    <Col sm={9}>
                      <Tab.Content>
                            {cycles[id_cycle - 1].owners.map(c => {
                              return <>
                              <TabPanes key={c.name.firstName} id={c.name.firstName} goalArr={c.goals}  />
                                 
                              </>;
                            })}
                      </Tab.Content>
                      
                    </Col>
                  </Row>
                </Tab.Container>
        </>
    );
  }
  
  export default UserTabs;