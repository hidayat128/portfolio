$(document).ready(function($){

const monthDiff = (d1, d2) => {
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

$("#table tbody tr").each(function(){

var date_updated= $(this).attr('data-updated');

if(typeof date_updated !== 'undefined' && date_updated !== false){
	
const start = new Date(date_updated);
const end = new Date();
$(this).attr('title',monthDiff(start,end)+" months ago");
	
}	
	
});



$('#search').focus();
$('#table tbody tr').addClass('active');
$('#close,#clear').hide();

/*Clear input button reset everything*/
$('#close,#clear').click(function(){
$('#search').val('');
$('#close,#clear').hide();
$('.mini_table label').removeAttr('class');
$('input[type=radio]').prop('checked', false);	
$('#table tbody tr').show().addClass('active');
$(".total-sites").text($('#table tbody tr.active').length);
});

/*Filter the rows by keywords*/
var $rows = $('#table tbody tr');
$('#search').keyup(function() {
$('input[type=radio]').prop('checked', false);	
$('#close').show();
$('#clear').hide();
    var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
    $('#table tbody tr').addClass('active');
   $rows.show().filter(function() {
   
    var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
        return !~text.indexOf(val);
    }).hide().removeClass('active');
	
	$(".total-sites").text($('#table tbody tr.active').length);
	
	if(val===''){
	$('#close').hide();
	$('#table tbody tr').show().addClass('active');
	
	}
});

/*Filter by Status/Genuine/Modified*/
$('input[name=site_status]').on('change',function() {
$('#search').val('');
$('#close').hide();
$('#clear').show();
$('#table tbody tr').show().addClass('active');
$('.mini_table label').removeAttr('class');

   var fltr_val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

// var fltr_val = $(this).val();
 $('#table tbody tr:not(.'+fltr_val+')').hide().removeClass('active');
 $('label[for='+fltr_val+']').addClass('radio_label');
 
 $(".total-sites").text($('#table tbody tr.active').length);

});


/*Link the columns to domain*/
$('#table tbody tr td:first-child').each(function(){
	var item_url="https://"+encodeURIComponent(this.innerHTML);
    this.innerHTML =this.innerHTML.link(item_url);

});



$("a").attr("target","_blank");
$(".total-sites,.fixed-total-sites").text($('#table tbody tr.active').length);

$(".profile-link").attr("href","https://www.linkedin.com/in/hidayat786/");

var current_year= new Date().getFullYear();
$("td.copyright").html("Copyright &copy; " + current_year + " Hidayat U.| All Rights Reserved");





});
