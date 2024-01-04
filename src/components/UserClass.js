import React from "react"

class UserClass extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			getData: {
				login: "username",
				name: "name",
				location: "location",
				avatar_url: "default"
			}
		}
	}
	async componentDidMount(){
		const data = await fetch("https://api.github.com/users/adityachaturvedi2906");
		const json = await data.json()
		console.log(json);

		this.setState({
			getData: json
		})
	}
	render(){
		return(
		<div className="user-card"> 
		<img src={this.state.getData.avatar_url} />
			<h1>Username: {this.state.getData.login}</h1>
			<h2>Name: {this.state.getData.name}</h2>
			<h2>Location: {this.state.getData.location}</h2>
			<h2>Contact: +91 7999364398</h2>
		</div>	
		)
	}
}

export default UserClass;