// loader
$(window).on('load', function(){
    $('.cssloader').fadeOut('slow',function(){$(this).remove();});
});



// Add smooth scrolling to all links in navbar
/*$(".navbar a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
        window.location.hash = hash;
      });
    } 
  });
*/

$(function(){
	$('.vg-nav').vegasMenu();
});
$(document).ready(function(){
	$('.btn-toggle').click(function() {
		$(this).find('.btn').toggleClass('active');  
		if ($(this).find('.btn-lang_switch').length>0) {
			$(this).find('.btn').toggleClass('btn-lang_switch');
		}
	});
});
$(window).scroll(function() {    
	var scroll = $(window).scrollTop();
	if (scroll >= 300) {
		$(".navigation").addClass("fixed-nav");
	} else {
		$(".navigation").removeClass("fixed-nav");
	}
});

$("body").on("click", "#contactus_submit", function() {
    if($("#user_name").val()==''){
        $("#user_name_error").html('Please enter your name').show();
        $("#user_name").focus();
        return false;
    }else {
        $("#user_name_error").hide();
    }

    var emailReg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if($("#email").val()==''){
        $("#email_error").html('Please enter your email').show();
        $("#email").focus();
        return false;
    }else if (!emailReg.test($("#email").val())) {
        $('#email_error').html('Please enter a valid email.').show();
        $("#email").focus();
        return false;
    }else {
        $('#email_error').hide();
    }

    var phone = $("#phone").val();
    var phone_arr = phone.split("");
    if(phone==""){
        $("#phone_error").html('please enter your phone no').show();
        $("#phone").focus();
        return false;
    }else {
            $("#phone_error").hide();
    }/*else if(phone_arr[0] != 6 && phone_arr[0] != 7 && phone_arr[0] != 8 && phone_arr[0] != 9) {
        $("#phone").val("");
        $("#phone_error").html("Please enter correct mobile number.").show();
        $("#phone").focus();
        return false;
    } else {
        if(phone.length !== 10) {            
            $("#phone_error").html("Please enter correct mobile number.").show();
            $("#phone").focus();
            return false;
        } else {
            $("#phone_error").hide();
        }
    }*/

    if($("#occupation").val()==''){
        $("#occupation_error").html('Please enter your facebook id').show();
        $("#occupation").focus();
        return false;
    }else {
        $("#occupation_error").hide();
    }
    if($("#message").val()==''){
        $("#message_error").html('Please enter your message');
        $("#message_error").show();
        $("#message").focus();
        return false;;
    }else {
        $("#message_error").hide();
    }

    $(this).attr('disabled', 'disabled');
    if($("#form_type").val()=='contact_us') {
        var data = $("#contact_us").serialize();
        $.ajax({
            url: base_url+"/custom_ajax.php",
            type: "POST",
            data:data,
            success: function(result) {
                if(result == "success") {
                    $(".display_msg").html('<p style="color:green; padding-left:15px;">Thank you! Your message has been received by the author.</p>');
                    setTimeout(function(){
                       $(".display_msg").html('').hide();
                       //location.reload();
                       $("#user_name").val("");
                       $("#email").val("");
                       $("#phone").val("");
                       $("#occupation").val("");
                       $("#message").val("");
                       $(this).removeAttr('disabled');
                    }, 5000);

                } else {
                    $(".display_msg").html('<p style="color:red; padding-left:15px;">All Fields are mandatory. Please try again.</p>');
                    $(this).removeAttr('disabled');
                }
            }
        });
    } else {
        $(this).removeAttr('disabled');
    }
});

$("body").on("click", "#subscriber_submit", function() {
    var emailReg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if($("#subscriber_email").val()==''){
        $("#subscriber_email_error").html('Please enter your email').show();
        $("#subscriber_email").focus();
        return false;
    }else if (!emailReg.test($("#subscriber_email").val())) {
        $('#subscriber_email_error').html('Please enter a valid email.').show();
        $("#subscriber_email").focus();
        return false;
    }else {
        $('#subscriber_email_error').hide();
    }
   

    $(this).attr('disabled', 'true');
    if($("#subscriber_form").find('input[name=form_type]').val()=='subscriber') {
        var data = $("#subscriber_form").serialize();
        $.ajax({
            url: base_url+"/custom_ajax.php",
            type: "POST",
            data:data,
            success: function(result) {
                if(result == "success") {
                    $(".subscriber_display_msg").html('<p style="color:green;">Thanks for the subscribe!</p>').show();
                    setTimeout(function(){
                       $(".subscriber_display_msg").html('').hide();
                       $("#subscriber_email").val("");
                    }, 5000);
                } else if(result == "exist") {
                    $(".subscriber_display_msg").html('<p style="color:orange;">You are already a subscribed user!</p>').show();
                    setTimeout(function(){
                       $(".subscriber_display_msg").html('').hide();
                       $("#subscriber_email").val("");
                       //location.reload();
                    }, 5000);
                } else {
                    $(".subscriber_display_msg").html('<p style="color:red;">All Fields are mandatory. Please try again.</p>');
                    setTimeout(function(){
                       $(".subscriber_display_msg").html('').hide();
                       //location.reload();
                    }, 5000);
                    $(this).removeAttr('disabled');
                }
            }
        });
    } else {
        $(this).removeAttr('disabled');
    }
});

$("body").on("click","#signIn", function(){
    var phone = $("#login_mobile_no").val();
    var otp = $("#login_otp_no").val();
    if($("#login_mobile_no").val()==""){
        $("#mobile_no_error").html("Please enter your mobile number");
        $("#login_mobile_no").focus();
        return false;
    }else{
        $("#mobile_no_error").html("");
    }
    if($("#login_otp_no").val()==""){
        $("#otp_error").html("Please enter your OTP");
        $("#login_otp_no").focus();
        return false;
    }else{
        $("#otp_error").html("");
    }
    if(phone!="" && otp!="") {
        if(phone.length==10) {
            $.ajax({
                url: base_url+"/custom_ajax.php",
                type: "POST",
                data: {phone: phone, form_type:'login_with_otp',otp:otp},
                success: function(result) {
                var data = JSON.parse(result);
                    if(data["code"] == "success") {
                       //window.location = '/my-profile/'
                       window.location.reload();
                    } else {
                        $("#login_with_otp_msg").html(data['errors']);
                        return false;
                    }
                }
            });
        }else{
            $("#login_with_otp_msg").html("Please enter only 10 digits mobile number");
            return false;
        }
        
    } else {
        $("#login_with_otp_msg").html("Please enter phone number");
        return false;
    }
});

$("body").on("click","#getOtpSignIn", function(){
    var phone = $("#login_mobile_no").val();
    if(phone!="") {
        if(phone.length==10) {
            $.ajax({
                url: base_url+"/custom_ajax.php",
                type: "POST",
                data: {phone: phone, action: 'send_otp', form_type:'login'},
                success: function(result) {
                var data = JSON.parse(result);
                    if(data['code'] == "success") {
                      $("#getOtpSignIn").addClass("hide");
                      $("#signIn").removeClass("hide");
                      $("#login_otp_no").removeClass("hide");
                    } else {
                        $("#login_with_otp_msg").html(data['errors']);
                    }
                }
            });
        }else{
            $("#mobile_no_error").html("Please enter only 10 digits mobile number");
            return false;
        }
    } else {
        $("#mobile_no_error").html("Please enter phone number");
        return false;
    }
});

$("body").on("click","#getOtpSignUp", function(){
    if($("#signup_user_type").val()=="recruiter"){
        if($("#signup_company_name").val()==""){
            $("#signup_company_name_error").html("Please enter your company name");
            $("#signup_company_name").focus();
            return false;
        }else{
            $("#signup_company_name_error").html("");
        }
    }
    if($("#signup_first_name").val()==""){
        $("#signup_first_name_error").html("Please enter your first name");
        $("#signup_first_name").focus();
        return false;
    }else{
        $("#signup_first_name_error").html("");
    }
    if($("#signup_last_name").val()==""){
        $("#signup_last_name_error").html("Please enter your last name");
        $("#signup_last_name").focus();
        return false;
    }else{
        $("#signup_last_name_error").html("");
    }
    if($("#signup_mobile_no").val()==""){
        $("#signup_mobile_no_error").html("Please enter your first name");
        $("#signup_mobile_no").focus();
        return false;
    }else{
        if($("#signup_mobile_no").val().length ==10){
            $("#signup_mobile_no_error").html("");
        }else{
            $("#signup_mobile_no_error").html("Please enter 10 digits mobile number");
            $("#signup_mobile_no").focus();
            return false;
        }
    }

    var phone = $("#signup_mobile_no").val();
    if(phone!="") {
        if(phone.length==10) {
            $.ajax({
                url: base_url+"/custom_ajax.php",
                type: "POST",
                data: {phone: phone, action: 'send_otp', form_type:'signup'},
                success: function(result) {
                var data = JSON.parse(result);
                    if(data['code'] == "success") {
                        $("#getOtpSignUp").addClass("hide");
                        $("#signUp").removeClass("hide");
                        $("#signup_otp_no").removeClass("hide");
                    } else {
                        $("#signup_with_otp_msg").html(data['errors']);
                    }
                }
            });
        }else{
            $("#signup_with_otp_msg").html("Please enter only 10 digits mobile number");
            return false;
        }
    } else {
        $("#signup_with_otp_msg").html("Please enter phone number");
        return false;
    }
});



$("body").on("click","#signUp", function(){
    if($("#signup_user_type").val()==""){
        $("#signup_user_type_error").html("Please enter a user type");
        $("#signup_user_type").focus();
        return false;
    }else{
        $("#signup_first_name_error").html("");
    }

    if($("#signup_user_type").val()=="recruiter"){
        if($("#signup_company_name").val()==""){
            $("#signup_company_name_error").html("Please enter your company name");
            $("#signup_company_name").focus();
            return false;
        }else{
            $("#signup_company_name_error").html("");
        }
    }

    if($("#signup_first_name").val()==""){
        $("#signup_first_name_error").html("Please enter your first name");
        $("#signup_first_name").focus();
        return false;
    }else{
        $("#signup_first_name_error").html("");
    }
    if($("#signup_last_name").val()==""){
        $("#signup_last_name_error").html("Please enter your last name");
        $("#signup_last_name").focus();
        return false;
    }else{
        $("#signup_last_name_error").html("");
    }
    if($("#signup_mobile_no").val()==""){
        $("#signup_mobile_no_error").html("Please enter your first name");
        $("#signup_mobile_no").focus();
        return false;
    }else{
        if($("#signup_mobile_no").val().length ==10){
            $("#signup_mobile_no_error").html("");
        }else{
            $("#signup_mobile_no_error").html("Please enter 10 digits mobile number");
            $("#signup_mobile_no").focus();
            return false;
        }
    }
    if($("#signup_otp_no").val()==""){
        $("#signup_otp_no_error").html("Please enter your OTP");
        $("#signup_otp_no").focus();
        return false;
    }else{
        $("#signup_otp_no_error").html("");
    }
    var phone = $("#signup_mobile_no").val();
    var otp = $("#signup_otp_no").val();
    var first_name = $("#signup_first_name").val();
    var last_name = $("#signup_last_name").val();
    var user_type = $("#signup_user_type").val();
    if($("#signup_user_type").val()=="recruiter"){
        var company_name = $("#signup_company_name").val();
        var params = {phone: phone, form_type:'signup_with_otp', otp:otp, first_name:first_name, last_name:last_name, user_type:user_type, comapny_name : company_name}
    }else {
        var params = {phone: phone, form_type:'signup_with_otp', otp:otp, first_name:first_name, last_name:last_name, user_type:user_type};
    }
    if(phone!="" && otp!="") {
        if(phone.length==10) {
            $.ajax({
                url: base_url+"/custom_ajax.php",
                type: "POST",
                data: params,
                success: function(result) {
                var data = JSON.parse(result);
                    if(data["code"] == "success") {
                       $("#signup_with_otp_msg").removeClass("d-text-red").addClass("d-text-green").html(data["message"]);
						setTimeout(function(){
							window.location.reload(); 
						}, 2000);
                        return false;
                    } else {
                        $("#signup_with_otp_msg").html(data['errors']);
                        return false;
                    }
                }
            });
        }else{
            $("#signup_with_otp_msg").html("Please enter only 10 digit");
            return false;
        }
        
    } else {
        $("#signup_with_otp_msg").html("Please enter phone number");
        return false;
    }
});

$("body").on("change","#signup_user_type", function(){
    var user_type = $(this).val();
    if(user_type=="recruiter"){
        $("#signup_company_name").removeClass("hide");
    }else{
        $("#signup_company_name").addClass("hide");
    }
});

$("body").on("click","#updateProfile", function(){

    if($("#u_s_first_name").val()==""){
        $("#u_s_first_name_error").html("Please enter your first name");
        $("#u_s_first_name").focus();
        return false;
    }else{
        $("#u_s_first_name_error").html("");
    }
    if($("#u_s_last_name").val()==""){
        $("#u_s_last_name_error").html("Please enter your last name");
        $("#u_s_last_name").focus();
        return false;
    }else{
        $("#signup_last_name_error").html("");
    }
    if($("#u_s_user_role").val()=="recruiter"){
        if($("#u_s_email_id").val()==""){
            $("#u_s_email_id_error").html("Please enter your email id");
            $("#u_s_email_id").focus();
            return false;
        }else{
            $("#u_s_email_id_error").html("");
        }
    }
    if($("#u_s_email_id").val() !=""){
        var emailReg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if(!emailReg.test($("#u_s_email_id").val())) {
            $('#u_s_email_id_error').html('Please enter a valid email.');
            $("#u_s_email_id").focus();
            return false;
        }else{
            $("#u_s_email_id_error").html("");
        }
    }


    var first_name = $("#u_s_first_name").val();
    var last_name = $("#u_s_last_name").val();
    var email_id = $("#u_s_email_id").val();
    var params = {form_type:'update_profile', first_name:first_name, last_name:last_name, email_id:email_id};
    if($("#u_s_user_role").val()=="recruiter"){
        var company_name = $("#u_s_company_name").val();
        var size_of_company = $("#u_s_size_of_company").val();
        var area_of_operation = $("#u_s_area_of_operation").val();
        var founded_in_year = $("#u_s_founded_in_year").val();
        var founder_name = $("#u_s_founder_name").val();
        if(company_name==""){
            $("#u_s_company_name_error").html("Please enter your company name");
            return false;
        }else{
            $("#u_s_company_name_error").html("");
        }

        if(size_of_company!=""){
            if(!$.isNumeric(size_of_company)){
                $("#u_s_size_of_company_error").html("Please enter only numeric value");
                return false;
            }else{
                $("#u_s_size_of_company_error").html("");
            }
        }else{
            $("#u_s_size_of_company_error").html("");
        }

        if(founded_in_year!=""){
            if(!$.isNumeric(founded_in_year)){
                $("#u_s_founded_in_year_error").html("Please enter only numeric value");
                return false;
            }else if(founded_in_year.length!='4'){
                $("#u_s_founded_in_year_error").html("Please enter only 4 digits");
                return false;
            }else{
                $("#u_s_founded_in_year_error").html("");
            }
        }else{
            $("#u_s_founded_in_year_error").html("");
        }
        var params = {form_type:'update_profile', first_name:first_name, last_name:last_name, email_id:email_id, company_name:company_name, size_of_company:size_of_company, area_of_operation:area_of_operation, founded_in_year:founded_in_year, founder_name:founder_name};
    }

    if(first_name!="" && last_name!="") {
        $.ajax({
            url: base_url+"/custom_ajax.php",
            type: "POST",
            data: params,
            success: function(result) {
            var data = JSON.parse(result);
                if(data["code"] == "success") {
                    //location.reload();
                    $("#u_s_error_msg").removeClass("d-text-red").addClass("d-text-green").html(data["message"]);
                    return false;
                } else {
                    $("#u_s_error_msg").html(data['errors']);
                    return false;
                }
            }
        });
        
    } else {
        $("#u_s_error_msg").html("Please enter first and last name");
        return false;
    }
});

$("body").on("click","#postAJob",function(){
    if($("#category_id").val()==""){
        $("#category_id_error").html("Please select a category.");
        $("#category_id").focus();
        return false;
    }else{
        $("#category_id_error").html("");
    }
    if($("#job_title").val()==""){
        $("#job_title_error").html("Please enter your job title.");
        $("#job_title").focus();
        return false;
    }else{
        $("#job_title_error").html("");
    }

    /*if($("#summary").val()==""){
        $("#summary_error").html("Please enter your job summary");
        $("#summary").focus();
        return false;
    }else{
        $("#summary_error").html("");
    }

    if($("#min_experience").val()==""){
        $("#min_experience_error").html("Please select min experience");
        $("#min_experience").focus();
        return false;
    }else{
        $("#min_experience_error").html("");
    }

    if($("#max_experience").val()==""){
        $("#max_experience_error").html("Please select max experience");
        $("#max_experience").focus();
        return false;
    }else{
        $("#max_experience_error").html("");
    }

    if($("#state_id").val()==""){
        $("#state_id_error").html("Please select city name");
        $("#state_id").focus();
        return false;
    }else{
        $("#state_id_error").html("");
    }

    if($("#city_id").val()==""){
        $("#city_id_error").html("Please select city name");
        $("#city_id").focus();
        return false;
    }else{
        $("#city_id_error").html("");
    }


    if($("#min_salary").val()==""){
        $("#min_salary_error").html("Please enter minimum salary");
        $("#min_salary").focus();
        return false;
    }else{
        $("#min_salary_error").html("");
    }

    if($("#max_salary").val()==""){
        $("#max_salary_error").html("Please enter minimum salary");
        $("#max_salary").focus();
        return false;
    }else{
        $("#max_salary_error").html("");
    }

    if($("#roles_responsibilities").val()==""){
        $("#roles_responsibilities_error").html("Please enter required roles and responsibilities");
        $("#roles_responsibilities").focus();
        return false;
    }else{
        $("#roles_responsibilities_error").html("");
    }

    if($("#employment_type").val()==""){
        $("#employment_type_error").html("Please select employment type");
        $("#employment_type").focus();
        return false;
    }else{
        $("#employment_type_error").html("");
    }*/
    
        var data = $("#post_a_job_form").serialize();
        $.ajax({
            url: base_url+"/custom_ajax.php",
            type: "POST",
            data:data,
            success: function(result) {
				var data = JSON.parse(result);
				if(data['code'] == "success") {
					$("#job_a_post_msg").html('<p style="color:green;">'+data["message"]+'</p>');
					return false;
				}else{
					$("#job_a_post_msg").html('All Fields are mandatory. Please try again.');
					return false;
				}
            }
        });
		return false;
});

$("body").on("change","#post_a_job_form #state_id", function(){
    var state_id = $(this).val();
    var params = {state_id: state_id, action:"get_cities"}
    if(state_id!="") {
        $.ajax({
            url: base_url+"/custom_ajax.php",
            type: "POST",
            data: params,
            success: function(result) {
            var data = JSON.parse(result);
                if(data["code"] == "success") {
                    var html='';
                    $.each( data["data"], function( key, value ) {
                      html +='<option value="'+key +'">'+capitalize_Words(value)+'</option>';
                    });
                    $("#post_a_job_form #city_id").html(html);
                    return false;
                } else {
                    $("#post_a_job_form #city_id").html("<option value=''>Select City</option>");
                    return false;
                }
            }
        });
    }else{
        $("#state_id_error").html("please select a state");
		return false;
    }
});

function capitalize_Words(str){
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

$("body").on("click",".applyJob",function(){
	var job_id = $(this).attr("jid");
	var recruiter_id = $(this).attr("rid");
	var user_id = $(this).attr("uid");
	var id = $("#app_"+job_id);
	$(this).attr("disabled", true);
	$(id).html("Appling...");
	$.ajax({
		url: base_url+"/custom_ajax.php",
		type: "POST",
		data:{action:"apply_job",job_id:job_id,recruiter_id:recruiter_id,user_id:user_id},
		success: function(result) {
			console.log(result);
			var data = JSON.parse(result);
			if(data['code'] == "success") {
				$(id).addClass("applied_job").html("Applied <i class='fa fa-check'></i>");
			}
			return false;
		}
	});
	return false;
});

$('.page-count, #filter_state, #filter_district, #filter_population, #filter_unemployment_rate').change(function () {
	
    var items_per_page = $(".adopt-table .page-count").val();
	var state = $("#filter_state").val();
	var district = $("#filter_district").val();
	var population = $("#filter_population").val();
	var unemployment_rate = $("#filter_unemployment_rate").val();
	var order_by = $(".adopt-table .act").attr("order");
	var sort_by = $(".adopt-table .act").attr("fname");
    $.ajax({
        url: base_url+"/custom_ajax.php",
        type: "POST",
        data:{action:"get_villages",items_per_page:items_per_page,state:state, district:district, population:population, unemployment_rate:unemployment_rate,order_by:order_by, sort_by:sort_by},
        success: function(result) {
            var data = JSON.parse(result);
            if(data['code'] == "success") {
                $("#village_data").html(data["html"]);
				$('html, body').animate({ scrollTop: $(".adopt-filters").offset().top }, 600);
				$(".current_range").html(data["current_range"]);
				$(".total_villages").html(data["village_count"]);
				if(data["next"]>data["max_page"]){
					$(".adopt-table .next").removeClass("active").attr("disabled","disabled").attr("page",data["next"]);
				}else{
					$(".adopt-table .next").addClass("active").removeAttr("disabled","disabled").attr("page",data["next"]);
				}
				if(data["previous"]==0){
					$(".adopt-table .prev").removeClass("active").attr("disabled","disabled").attr("page",data["previous"]);
				}else{
					$(".adopt-table .prev").addClass("active").removeAttr("disabled","disabled").attr("page",data["previous"]);
				}
				
            }
            return false;
        }
    });
});

$(".adopt-table .next, .adopt-table .prev, .sort_data").click(function () {
	if($(this).attr("disabled")){
		return false;
	}
	var page = $(this).attr("page");
	
	
	if(page==undefined){
		$(".sort_data").removeClass("act");
		$(this).addClass("act");
		var val = $(this).attr("fname");
		var att = $(this).attr("order");
		$(".sort_data").attr("order","DESC");
		if(att=="ASC"){
			$(this).attr("order","DESC");
		} else{
			$(this).attr("order","ASC");
		}
	}
	var order_by = $(".adopt-table .act").attr("order");
	var sort_by = $(".adopt-table .act").attr("fname");
	
	var items_per_page = $(".adopt-table .page-count").val();
	var state = $("#filter_state").val();
	var district = $("#filter_district").val();
	var population = $("#filter_population").val();
	var unemployment_rate = $("#filter_unemployment_rate").val();
	
    $.ajax({
        url: base_url+"/custom_ajax.php",
        type: "POST",
		data:{action:"get_villages",items_per_page:items_per_page,page: page,state:state, district:district, population:population, unemployment_rate:unemployment_rate,order_by:order_by, sort_by:sort_by},
        success: function(result) {
            var data = JSON.parse(result);
            if(data['code'] == "success") {
                $("#village_data").html(data["html"]);
				$('html, body').animate({ scrollTop: $(".adopt-filters").offset().top }, 500);
				$(".current_range").html(data["current_range"]);
				$(".total_villages").html(data["village_count"]);
				if(data["next"]>data["max_page"]){
					$(".adopt-table .next").removeClass("active").attr("disabled","disabled").attr("page",data["next"]);
				}else{
					$(".adopt-table .next").addClass("active").removeAttr("disabled","disabled").attr("page",data["next"]);
				}
				if(data["previous"]==0){
					$(".adopt-table .prev").removeClass("active").attr("disabled","disabled").attr("page",data["previous"]);
				}else{
					$(".adopt-table .prev").addClass("active").removeAttr("disabled","disabled").attr("page",data["previous"]);
				}
            }
            return false;
        }
    });
});

$("#filter_state").change(function () {
	var state = $(this).val();
	if(state){
	   $.ajax({
			url: base_url+"/custom_ajax.php",
			type: "POST",
			data:{action:"get_district_by_state",state:state},
			success: function(result) {
				var data = JSON.parse(result);
				if(data['code'] == "success") {
					$("#filter_district").html(data["html"]);
				}
				return false;
			}
		});
	}
});

$("#read_more_jobs").click(function(){
	var page = $(this).attr("page");
	var category_id = $(this).attr("job_cat_id");
	var city_id = $(this).attr("job_city_id");
	var exp = $(this).attr("job_exp");
	$(this).html('<button class="btn d-margin-top-20 load_more">Loading...</button>');
	$.ajax({
		url: base_url+"/custom_ajax.php",
		type: "POST",
		data:{action:"read_more_jobs",page:page,category_id:category_id, city_id:city_id, exp:exp},
		success: function(result) {
			var data = JSON.parse(result);
			if(data['code'] == "success") {
				$("#read_more_jobs").parent().before(data["html"]);
				$("#read_more_jobs").attr("page",data["next_page"]);
				$("#read_more_jobs").html('<button class="btn d-margin-top-20 load_more">Load More</button>');
				if(data["next_page"]>data["max_page"]){
					$("#read_more_jobs").parent().addClass("hide");
				}
			}
			return false;
		}
	});
})

$("body").on("click", "#getAdoptVillage", function() {
	$("#adopt_res_msg").html('');
    if($("#adopt_first_name").val()==''){
        $("#adopt_first_name_error").html('Please enter your first name').show();
        $("#adopt_first_name").focus();
        return false;
    }else {
        $("#adopt_first_name_error").hide();
    }
	
	if($("#adopt_last_name").val()==''){
        $("#adopt_last_name_error").html('Please enter your last name').show();
        $("#adopt_last_name").focus();
        return false;
    }else {
        $("#adopt_last_name_error").hide();
    }
	
    var phone = $("#adopt_mobile_no").val();
    var phone_arr = phone.split("");
    if(phone==""){
        $("#adopt_mobile_no_error").html('please enter your phone no').show();
        $("#adopt_mobile_no").focus();
        return false;
    } else {
            $("#adopt_mobile_no_error").hide();
    }/*else if(phone_arr[0] != 6 && phone_arr[0] != 7 && phone_arr[0] != 8 && phone_arr[0] != 9) {
        $("#adopt_mobile_no").val("");
        $("#adopt_mobile_no_error").html("Please enter correct mobile number.").show();
        $("#adopt_mobile_no").focus();
        return false;
    } else {
        if(phone.length !== 10) {            
            $("#adopt_mobile_no_error").html("Please enter correct mobile number.").show();
            $("#adopt_mobile_no").focus();
            return false;
        } else {
            $("#adopt_mobile_no_error").hide();
        }
    }*/

    var emailReg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if($("#adopt_email_id").val()==''){
        $("#adopt_email_id_error").html('Please enter your email').show();
        $("#adopt_email_id").focus();
        return false;
    }else if (!emailReg.test($("#adopt_email_id").val())) {
        $('#adopt_email_id_error').html('Please enter a valid email.').show();
        $("#adopt_email_id").focus();
        return false;
    }else {
        $('#adopt_email_id_error').hide();
    }


    if($("#adopt_what_do").val()==''){
        $("#adopt_what_do_error").html('Please select what do you want to donate').show();
        $("#adopt_what_do").focus();
        return false;
    }else {
        $("#adopt_what_do_error").hide();
    }
    if($("#adopt_message").val()==''){
        $("#adopt_message_error").html('Please enter your message');
        $("#adopt_message_error").show();
        $("#adopt_message").focus();
        return false;;
    }else {
        $("#adopt_message_error").hide();
    }

    $(this).attr('disabled', 'disabled');
    if($("#form_type").val()=='adopt_village') {
        var data = $("#adopt_form").serialize();
        $.ajax({
            url: base_url+"/custom_ajax.php",
            type: "POST",
            data:data,
            success: function(response) {
				var result = JSON.parse(response);
                if(result["code"] == "success") {
                    $("#adopt_res_msg").html('<p style="color:green; margin-top:10px;">' +result["message"]+ ' </p>');
                    setTimeout(function(){
                       $("#adopt_first_name").val("");
					   $("#adopt_last_name").val("");
					   $("#adopt_email_id").val("");
					   $("#adopt_mobile_no").val("");
					   $("#adopt_what_do").val("");
                       $("#adopt_message").val("");
					   $("#adopt_res_msg").html('').hide();
                       $("#getAdoptVillage").removeAttr('disabled');
                    }, 5000);
                } else {
                    $("#adopt_res_msg").html('<p style="color:red; margin-top:10px;">' +result["message"]+ '</p>');
                    $("#getAdoptVillage").removeAttr('disabled');
                }
            }
        });
    } else {
        $("#getAdoptVillage").removeAttr('disabled');
    }
});
