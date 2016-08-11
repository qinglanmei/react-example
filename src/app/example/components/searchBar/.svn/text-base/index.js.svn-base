import React,{Component} from 'react';//引入react
import './index.scss?l';//引入css文件
//接收用户输入的组件
export default class SearchBar extends Component{
	constructor(props){
		super(props);
		this.state={

		}
	}
	/**
	 * 输入框改变或者复选框改变 调用父组件的方法,传递需要改变state的参数
	 * @return {[type]} [description]
	 */
	handleChange=()=>{
		this.props.onUserInput(
			this.refs.filterTextInput.value,
			this.refs.inStockOnlyInput.checked
		);
	}
	render(){	
		return(
			<form>
				<input className='txtName' type="text" 
				placeholder="Search..." 
				value={this.props.filterText} 
				ref="filterTextInput"
				onChange={this.handleChange}
				/>
				<p>
					<input type="checkbox" name="" 
					checked={this.props.inStockOnly}
					ref="inStockOnlyInput"
					onChange={this.handleChange}
					 />
					{' '}
					Only show products in stock
				</p>
			</form>
		)
	}
}