import React, { Component } from 'react'
import { fetch_data } from '../controllers/data';
import StudentInfo from './StudentInfo';
export class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            studentData: [],
            searchStudent: "",
            searchTag: "",
            filteredStudentData: [],
            studentTags: {},

        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    async componentDidMount() {
        const data = await fetch_data()
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

        } else if (!currTags[studentId].includes(value)) {
            currTags[studentId].push(value)
        }
        this.setState({ studentTags: currTags })
        const tags = JSON.stringify(currTags)

    }

    handleTagDelete = (studentId, value) => {
        var currTags = { ...this.state.studentTags }
        var oldTags = currTags[studentId]

        currTags[studentId] = oldTags.filter((tag) => {
            return tag != value
        })


        this.setState({ studentTags: currTags })
        const tags = JSON.stringify(currTags)
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;


        this.setState({
            [name]: value,


        }, () => {
            let filteredData = []


            if (name == "searchStudent") {
                if (value == "" && this.state.searchTag == "") {
                    filteredData = this.state.studentData
                }
                else if (value == "" && this.state.searchTag != "") {
                    filteredData = this.state.studentData.filter((student) => {
                        //Check lower case
                        return student.id in this.state.studentTags && this.state.studentTags[student.id].toString().includes(this.state.searchTag)
                    })
                }
                else if (value != "" && this.state.searchTag != "") {
                    filteredData = this.state.studentData.filter((student) => {
                        //Check lower case
                        const fullName = student.firstName + student.lastName
                        return (student.id in this.state.studentTags && this.state.studentTags[student.id].toString().includes(this.state.searchTag)) && fullName.toLowerCase().includes(value)
                    })
                }
                else {
                    filteredData = this.state.studentData.filter((student) => {
                        //Check lower case
                        const fullName = student.firstName + student.lastName
                        return fullName.toLowerCase().includes(value)
                    })
                }
            }
            else if (name == "searchTag") {

                if (value == "" && this.state.searchStudent == "") {
                    filteredData = this.state.studentData
                }

                else if (value != "" && this.state.searchStudent == "") {
                    filteredData = this.state.studentData.filter((student) => {

                        return student.id in this.state.studentTags && this.state.studentTags[student.id].toString().includes(this.state.searchTag)
                    })
                }

                else if (value == "" && this.state.searchStudent != "") {
                    filteredData = this.state.studentData.filter((student) => {
                        const fullName = student.firstName + student.lastName
                        return fullName.toLowerCase().includes(this.state.searchStudent)
                    })
                }
                else {
                    filteredData = this.state.studentData.filter((student) => {

                        const fullName = student.firstName + student.lastName
                        return (student.id in this.state.studentTags && this.state.studentTags[student.id].toString().includes(value)) && fullName.toLowerCase().includes(this.state.searchStudent)
                    })
                }
            }

            this.setState({ filteredStudentData: filteredData })
        });


    }

    render() {
        return (


            <div className="container">
                <div className="row">
                    <div className="jumbotron jumbotron-fluid">
                        <div className="row">
                            <h1 className="display-4">Welcome</h1>
                            <p className="lead">Made by Mahir Dhall</p>

                            <div className="col-6">

                                <div className="input-group input-group-lg">

                                    <input type='text' id="searchbyName" aria-label="search student by name" className="form-control" placeholder="Search by Name" name="searchStudent" onChange={this.handleInputChange} value={this.state.searchStudent} aria-describedby="inputGroup-sizing-sm"></input>

                                </div>


                            </div>
                            <div className="col-6">

                                <div className="input-group input-group-lg">

                                    <input type='text' id="searchByTag" placeholder="Search by Tag" className="form-control" aria-label="search student by tag" name="searchTag" onChange={this.handleInputChange} value={this.state.searchTag}></input>


                                </div>

                            </div>



                        </div>
                    </div>
                </div>




                <div className="row">

                    {/* style error message */}
                    {this.state.filteredStudentData.length != 0 ? this.state.filteredStudentData.map((currStudent) => (
                        <div className="col-12 d-flex justify-content-center" key={currStudent.id}>
                            <StudentInfo studentData={currStudent} handleTagInsert={this.handleTagInsert}
                                studentTag={this.state.studentTags[currStudent.id]} handleTagDelete={this.handleTagDelete}
                            ></StudentInfo></div>
                    )) : <div className="col-12"><p>No student found with name {this.state.searchStudent}</p></div>}

                </div>



            </div>

        )
    }
}


export default Home
