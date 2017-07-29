import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {contributors_recent: [],
                    contributors_alltime: [],
                    display: "recent"
                };

        this.displayContributors = this.displayContributors.bind(this);
        this.displayRecent = this.displayRecent.bind(this);
        this.displayAllTime = this.displayAllTime.bind(this);
        this.parse_contributors = this.parse_contributors.bind(this);
    }

    // ajax call helper function
    ajaxCall(url) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
                resolve(JSON.parse(this.responseText));
            }
            xhr.onerror = reject;
            xhr.open("GET", url)
            xhr.send();
        });
    }

    // parse contributors depending on type of json call
    parse_contributors(type) {
        let url;
        let contr;
        if (type === "recent") {
            url = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
            contr = this.state.contributors_recent
            this.setState({display: "recent"});
        } else {
            url = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
            contr = this.state.contributors_alltime
            this.setState({display: "alltime"});
        }

        this.ajaxCall(url)
        .then((result) => {
            for (let usr of result) {
                let contributors = contr;
                let contributor = {
                    "username": usr.username,
                    "recent": usr.recent,
                    "alltime": usr.alltime,
                    "image": usr.img
                }
                contributors.push(contributor);
                this.setState({contributors: contributors});
            }
            return result;
        })
        .catch((reject) => {
            // an error occured
            console.log(reject);
        });
    }

    // display contributors
    displayContributors() {
        let recent_clicks;
        let contrib;
        if (this.state.display === "recent") {
            contrib = this.state.contributors_recent;
        } else {
            contrib = this.state.contributors_alltime;
        }
        // if contributors do not exist parse contributors
        if (contrib.length === 0) {
            this.parse_contributors(this.state.display);
        }
    }

    // display contributors with recent points
    displayRecent() {
        let contributors = this.state.contributors_recent;
        // on double click on last 30 days, score is reversed
        if (this.state.display === "recent" && contributors.length > 0) {
            let contr = contributors.reverse();
            this.setState({contributors_recent: contr});
        }
        this.setState({display: "recent"}, this.displayContributors());
    }

    // display contributors with all time high points
    displayAllTime() {
        let contributors = this.state.contributors_alltime;
        // if you double click on all time points, score reversed
        if (this.state.display === "alltime" && contributors.length > 0) {
            let contr = contributors.reverse();
            this.setState({contributors_alltime: contr});
        }
        this.setState({display: "alltime"}, this.displayContributors());

    }

    // download data when app is opened
    componentDidMount() {
        this.displayRecent();
    }

    // render table
    render() {
        let contributors;
        if (this.state.display === "recent") {
            contributors = this.state.contributors_recent;
        } else {
            contributors = this.state.contributors_alltime;
        }
        let tableData = contributors.map((contributor, index) => {
            return (
                <Row key={index}
                    order={index + 1}
                    image={contributor.image}
                    name={contributor.username}
                    pointsRecent={contributor.recent}
                    pointsAllTime={contributor.alltime}
                />
            )
    });

    return (
        <table>
            <thead>
                <tr>
                    <th> # </th>
                    <th> Name </th>
                    <th onClick={this.displayRecent}> Points in past 30 days </th>
                    <th onClick={this.displayAllTime}> All times points</th>
                </tr>
            </thead>

            <tbody>
                {tableData}
            </tbody>
        </table>
    );
  }
}


class Row extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.order}</td>
                <td><div className="table-row">
                        <img src={this.props.image} alt={"logo"} className="table-avatar"/>
                        <a href={"https://www.freecodecamp.com/" + this.props.name} target={"blank"} rel={"noopener noreferrer"}>{this.props.name}</a>
                    </div>
                </td>
                <td>{this.props.pointsRecent}</td>
                <td>{this.props.pointsAllTime}</td>
            </tr>
        );
    }
}

export default App;
