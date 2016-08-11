import React,{Component} from 'react';//引入react
import ProductCategoryRow from '.././productCategoryRow/index.js';//引入列标题
import ProductRow from '.././productRow/index.js';//引入列表组件
import './index.scss';//引入css文件
//创建根据用户输入过滤展示数据组件
export default class ProductTable extends Component{
	constructor(props){
		super(props);
		this.state={

		}
	}
	
	render(){	
		let rows=[];
			let lastCategory=null;
			this.props.products.forEach((product)=>{
				//过滤数据
				if(product.name.indexOf(this.props.filterText)===-1||(!product.stocked&&this.props.inStockOnly)){
					return;
				}

				//如果是一个新的列标题,则加上列标题
				if(product.category!=lastCategory){
					rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
				}
				/**
				 * 插入列表
				 * @type {Object}
				 */
				rows.push(<ProductRow product={product} key={product.name} />);
				/**
				 * 把最后的列标题更新
				 * @type {[type]}
				 */
				lastCategory=product.category;
		});
		return(
			<table>
				<thead>
				<tr>
					<th>Name</th>
					<th>Price</th>
				</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		)
	}
}