import * as React from "react";
import "./App.css";

import Main from "./content/Main";
import Info from "./content/Info";
import CalcHelper from "./content/CalcHelper";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { idx: 2 };

		// 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
		this.checkMenu = this.checkMenu.bind(this);
	}

	checkMenu(e) {
		e.preventDefault();
		let idxNum = e.target.dataset.idx;
		console.log("this.idx : ", idxNum);

		this.setState((state) => ({
		idx: idxNum,
		}));
	}

	render() {
		return (
		<div>
			<header>
				<ul className="layout">
					<li onClick={this.checkMenu} data-idx="0">메인</li>
					<li onClick={this.checkMenu} data-idx="1">Info</li>
					<li onClick={this.checkMenu} data-idx="2">CalcHelper</li>
				</ul>
			</header>

			<div className="layout">
			<ContentInput contentIdx={this.state.idx} />
			</div>

			<footer>
			<div className="layout">~~Footer 영역입니다~~</div>
			</footer>
		</div>
		);
	}
}

class ContentInput extends React.Component {
	render() {
		console.log("this.props.contentIdx : ", this.props.contentIdx);
		let contentCon = <Main />;

		if (this.props.contentIdx === "1") {
		contentCon = <Info />;
		} else if (this.props.contentIdx === "2") {
		contentCon = <CalcHelper />;
		}

		return contentCon;
	}
}

export default App;
