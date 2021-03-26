import React, { Component } from 'react'
import close_sign from '../Assets/minus-circle.png'

export class StudentInfo extends Component {
    constructor(props) {
        super(props)


        this.state = {
            studentData: this.props.studentData,
            expandGrade: false,
            tagInput: ""
        }
    }
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    }

    handleOnExpand = () => {
        this.setState({
            expandGrade: !this.state.expandGrade
        })
    }

    onKeyUp = (event) => {
        if (event.charCode === 13) {
            this.props.handleTagInsert(this.state.studentData.id, event.target.value)
            this.setState({
                tagInput: ""
            })
        }

    }



    render() {
        const { city, company, email, firstName, grades, id, lastName, pic, skill } = this.state.studentData

        const gradeAvg = grades.reduce((a, b) => parseInt(a) + parseInt(b)) / grades.length
        return (

            <div className="card mb-3" style={{ width: "80%" }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={pic} alt={firstName} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{firstName + " " + lastName}</h5>
                            <p className="card-text">Email: {email}</p>
                            <p className="card-text">Company: {company}</p>
                            <p className="card-text">Skill: {skill}</p>
                            <p className="card-text">Average: {gradeAvg}%</p>
                        </div>
                        {/* handle button icon */}
                        <button color="primary" onClick={this.handleOnExpand}>Expand</button>


                        {this.state.expandGrade && grades.map((grade, index) => (
                            < p key={index} > Test { index + 1}: {grade}%</p>
                        ))}

                        {this.props.studentTag && this.props.studentTag.map((tag, index) => (
                            <div key={index}>
                                <button type="button" class="btn btn-light">{tag}</button>
                                <img src={close_sign} onClick={() => { this.props.handleTagDelete(id, tag) }} alt="delete skill"></img>
                            </div>
                            // <button key={index} color="secondary">{tag}</button>
                        ))}

                        <label htmlFor="tagInput">Enter Tags</label>
                        <input type="text" name="tagInput" value={this.state.tagInput} onChange={this.handleInputChange} onKeyPress={this.onKeyUp} style={{ borderBlock: "solid", borderBottom: "10px" }}></input>

                    </div>


                </div>
            </div >
        )
    }
}

export default StudentInfo
