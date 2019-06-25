import React, {Component} from 'react';
import './Styles.css';
import Guest from './Guest';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        showLogin: state.showLogin,
        GuestsList: state.GuestsList
    }
};

const mapDispachToProps = (dispach) => {

    return {

        sendGuestsData: (guestsData) => dispach({type: "DATA", guestsData: guestsData}),

    }
};

class GuestBook extends Component {
 /*   state = {
        data: [
            {
                Name: '',
                Body: ''
            }
        ]
    };*/

    addOne = (Name, Body) => {
        let arr = {
            Name: Name,
            Body: Body
        };

        fetch('http://127.0.0.1:8080/postguest', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({arr})

        }).then(response => response.json())
            .then(res => {
                this.setState({
                    data: [...this.state.data, res]
                });
                console.log(res)
            });
    };


    RemoveHandler = (id) => {

        const data = this.state.data;
        fetch('http://127.0.0.1:8080/delguest/' + id, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}

        })
            .then(res => res.json())
            .then(() => {
                let newData = data.filter(guest => guest._id !== id);
              /*  this.setState({
                    data: newData
                });*/

            });
    };

    componentDidMount() {
        const handleErrors = (response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        };

        fetch("http://127.0.0.1:8080/guests")
            .then(handleErrors)
            .then(res => res.json())
            .then(result => {

                let data = result;
                console.log(data)

                // this.setState({data});
                this.props.sendGuestsData(data)
            })
            .catch(err => {
                console.log(err);
            });


        // So you should add credentials: 'include' for sending cookies
        fetch("http://localhost:8080/auth/login/success", {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            }
        })
            .then(handleErrors)
            .then(response => {
                if (response.status === 200) return response.json();
                throw new Error("failed to authenticate user");
            })
            .then(responseJson => {
                console.log(responseJson.user.username)
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const ViewGuests = this.props.GuestsList.map((guest) =>
            <Col sm={4}> <Guest RemoveHandler={this.RemoveHandler} Id={guest._id}
                                guestName={guest.Name} guestBody={String(guest.Body)}/> </Col>
        );

        return (
            <div className="divMargin">
                <Container>
                    <Row>{ViewGuests}</Row>
                </Container>

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispachToProps)(GuestBook);