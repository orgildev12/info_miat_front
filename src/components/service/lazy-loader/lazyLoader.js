import React from "react";

const lazyLoader = (importComp, fallback) => {
	return class extends React.Component {
		state = {
			component: null, //initializing state
		};

		//loading the component and setting it to state
		componentDidMount() {
			importComp().then((comp) => this.setState({ component: comp.default }));
		}

		//rendering the component
		render() {
			const C = this.state.component;
			return C ? (
				<C {...this.props} />
			) : fallback ? (
				fallback
			) : (
				<div className="k-loading-mask" style={{ zIndex: 100000 }}>
					<span className="k-loading-text">Loading</span>
					<div className="k-loading-image"></div>
					<div className="k-loading-color"></div>
				</div>
			);
			// If component is not loaded then return fallback component, if fallback is not provided then use default loading
		}
	};
};
export default lazyLoader;