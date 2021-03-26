import React, { Component } from 'react'
import { fetch_data } from '../controllers/data';
import StudentInfo from './StudentInfo';
export class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            studentData: [],
            searchStudent: "",
            filteredStudentData: [],
            studentTags: {}

        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    async componentDidMount() {
        const data = await fetch_data()

        if (localStorage.getItem("studentTags") != undefined) {
            let tags = JSON.parse(localStorage.getItem("studentTags"))
            this.setState({ studentTags: tags })
        }

        // console.log(tags)

        this.setState({
            studentData: data.students,
            filteredStudentData: data.students,
        }, () => {
            console.log(this.state.studentData)
        })

    }



    handleTagInsert = (studentId, value) => {

        var currTags = { ...this.state.studentTags }


        if (studentId in currTags === false) {
            currTags[studentId] = [value]
        } else {
            currTags[studentId].push(value)
        }
        this.setState({ studentTags: currTags })
        const tags = JSON.stringify(currTags)
        localStorage.setItem("studentTags", tags)

    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let filteredData = []

        if (value == "") {
            filteredData = this.state.studentData
        }
        else {
            filteredData = this.state.studentData.filter((student) => {
                //Check lower case
                const fullName = student.firstName + student.lastName
                return fullName.toLowerCase().includes(value)
            })
        }

        this.setState({
            [name]: value,
            filteredStudentData: filteredData

        });
    }

    render() {
        return (

            <React.Fragment>
                <input type='text' placeholder="Search by Name" name="searchStudent" onChange={this.handleInputChange} value={this.state.searchStudent}></input>
                <div>
                    {/* style error message */}
                    {this.state.filteredStudentData.length != 0 ? this.state.filteredStudentData.map((currStudent) => (
                        <StudentInfo key={currStudent.id} studentData={currStudent} handleTagInsert={this.handleTagInsert}
                            studentTag={this.state.studentTags[currStudent.id]}
                        ></StudentInfo>
                    )) : <div><p>No student found with name {this.state.searchStudent}</p></div>}
                </div>

            </React.Fragment>
        )
    }
}


export default Home
