if (process.env.NODE_ENV !== 'production') {
    require('./index.html');
}
import $ from 'jquery'
import "./index.scss";
import Header from '@/components/header/index'
$.ajax({
	url: '/mobile/homes/articlemore/1556232370.json',
	success: function(res){
		console.log(res)
	}
});