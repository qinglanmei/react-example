import React,{Component} from 'react';//引入react
import './index.scss';//引入css文件
//创建列表组件
export default class ProductRow extends Component{
	constructor(props){
		super(props);
		this.state={

		}
	}
	
	render(){
		//根据stocked状态显示时候需要加上红色
		let name=this.props.product.stocked ? 
				this.props.product.name:
				<span style={{color: 'red'}}>{this.props.product.name}</span>
		return(
			<tr>
				<td>{name}</td>
				<td>{this.props.product.price}</td>
			</tr>
		)
	}
}