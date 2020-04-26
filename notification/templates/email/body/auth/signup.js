module.exports = (user) =>  {
  let id= user._id + "/" +user.verification.number;
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <title>Tailorgang verification email</title>
      <style type="text/css">
      body {
       padding-top: 0 !important;
       padding-bottom: 0 !important;
       padding-top: 0 !important;
       padding-bottom: 0 !important;
       margin:0 !important;
       width: 100% !important;
       -webkit-text-size-adjust: 100% !important;
       -ms-text-size-adjust: 100% !important;
       -webkit-font-smoothing: antialiased !important;
     }
     .tableContent img {
       border: 0 !important;
       display: block !important;
       outline: none !important;
     }
     a{
      color:#382F2E;
    }

    p, h1{
      color:#382F2E;
      margin:0;
    }
 p{
      text-align:left;
      color:#999999;
      font-size:14px;
      font-weight:normal;
      line-height:19px;
    }

    a.link1{
      color:#382F2E;
    }
    a.link2{
      font-size:16px;
      text-decoration:none;
      color:#ffffff;
    }

    h2{
      text-align:left;
       color:#222222;
       font-size:19px;
      font-weight:normal;
    }
    div,p,ul,h1{
      margin:0;
    }

    .bgBody{
      background: #ffffff;
    }
    .bgItem{
      background: #ffffff;
    }

@media only screen and (max-width:480px)

{

table[class="MainContainer"], td[class="cell"]
	{
		width: 100% !important;
		height:auto !important;
	}
td[class="specbundle"]
	{
		width:100% !important;
		float:left !important;
		font-size:13px !important;
		line-height:17px !important;
		display:block !important;
		padding-bottom:15px !important;
	}

td[class="spechide"]
	{
		display:none !important;
	}
	    img[class="banner"]
	{
	          width: 100% !important;
	          height: auto !important;
	}
		td[class="left_pad"]
	{
			padding-left:15px !important;
			padding-right:15px !important;
	}

}

@media only screen and (max-width:540px)

{

table[class="MainContainer"], td[class="cell"]
	{
		width: 100% !important;
		height:auto !important;
	}
td[class="specbundle"]
	{
		width:100% !important;
		float:left !important;
		font-size:13px !important;
		line-height:17px !important;
		display:block !important;
		padding-bottom:15px !important;
	}

td[class="spechide"]
	{
		display:none !important;
	}
	    img[class="banner"]
	{
	          width: 100% !important;
	          height: auto !important;
	}
	.font {
		font-size:18px !important;
		line-height:22px !important;

		}
		.font1 {
		font-size:18px !important;
		line-height:22px !important;

		}
}

    </style>
<script type="colorScheme" class="swatch active">
{
    "name":"Default",
    "bgBody":"ffffff",
    "link":"382F2E",
    "color":"999999",
    "bgItem":"ffffff",
    "title":"222222"
}
</script>
  </head>
  <body paddingwidth="0" paddingheight="0"   style="padding-top: 0; padding-bottom: 0; padding-top: 0; padding-bottom: 0; background-repeat: repeat; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased;" offset="0" toppadding="0" leftpadding="0">
    <table bgcolor="#ffffff" width="100%" border="0" cellspacing="0" cellpadding="0" class="tableContent" align="center"  style="font-family:Helvetica, Arial,serif;">
  <tbody>
    <tr>
      <td><table width="600" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#ffffff" class="MainContainer">
  <tbody>
    <tr>
      <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td valign="top" width="40">&nbsp;</td>
      <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tbody>
  <!-- =============================== Header ====================================== -->
    <tr>
    	<td height="75" class="spechide"></td>

        <!-- =============================== Body ====================================== -->
    </tr>
    <tr>
      <td class="movableContentContainer " valign="top">
        <div class="movableContent" style="border: 0px; padding-top: 0px; position: relative;">
        	<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                          <tr>
                            <td valign="top" align="center">
                              <div class="contentEditableContainer contentImageEditable">
                                <div class="contentEditable">
                                  <img src="https://ik.imagekit.io/nugitech/wp-content/uploads/2018/08/194X47.png" width="251"  alt="" data-default="placeholder" data-max-width="560">
                                </div>
                              </div>
                            </td>
                          </tr>
                        </table>
        </div>
        <div class="movableContent" style="border: 0px; padding-top: 0px; position: relative;">
        	<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                          <tr><td height="55"></td></tr>
                          <tr>
                            <td align="left">
                              <div class="contentEditableContainer contentTextEditable">
                                <div class="contentEditable" align="center">
                                  <h2 >Thank you for signing up to the Tailorgang!</h2>
                                </div>
                              </div>
                            </td>
                          </tr>

                          <tr><td height="15"> </td></tr>

                          <tr>
                            <td align="left">
                              <div class="contentEditableContainer contentTextEditable">
                                <div class="contentEditable" align="center">
                                  <p >
                                    To get you ready for the experience, please kindly verify your email user.email. Copy this link: <a target="_blank" href="https://tailorgang.io/welcome/index/${id}" class="link1" >https://tailorgang.io/welcome/index/${id}</a> to your browser to verify your account.
                                    <br>
                                    <br>
                                    If you have any Trouble doing so, please email us at help@tailorgang.io or call our team on 234 81 0029 1532.
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>

                          <tr><td height="25"></td></tr>

                          <tr>
                            <td align="center">
                              <table>
                                <tr>
                                  <td align="center" bgcolor="#894291" style="background:#894291; padding:15px 18px;-webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px;">
                                    <div class="contentEditableContainer contentTextEditable">
                                      <div class="contentEditable" align="center" style="color: #ffffff !important;">
                                        <a target="_blank" href="https://tailorgang.io/welcome/index/${id}" class="link2" style="color: #ffffff !important;">Verify your Account</a>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
			  <tr>
                            <td style="padding-top: 20px;text-align: left;color: #999999 !important;font-size: 14px;font-weight: normal;line-height: 19px;">
                              <table>
                                <tbody><tr>
                                    Thank you for Joining our community of Tailors, Customers and vendors!,
                                    <br>
<br>
<span style="color:#222222;">The Tailorgang Team</span>
                                </tr>
                              </tbody></table>
                            </td>
                          </tr>
                          <tr><td height="20"></td></tr>
                        </table>
        </div>
        <div class="movableContent" style="border: 0px; padding-top: 0px; position: relative;">
        	<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td height="65">
    </tr>
    <tr>
      <td  style="border-bottom:1px solid #DDDDDD;"></td>
    </tr>
    <tr><td height="25"></td></tr>
    <tr>
      <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td valign="top" class="specbundle"><div class="contentEditableContainer contentTextEditable">
                                      <div class="contentEditable" align="center">
                                        <p  style="text-align:left;color:#CCCCCC;font-size:12px;font-weight:normal;line-height:20px;">
                                          <span style="font-weight:bold;">Tailorgang</span>
                                          <br>
                                          Calabar, Nigeria
                                          <br>
                                          <a class="link1" class="color:#382F2E;" style="text-decoration: none;" >Uninterested? Ignore email</a>
                                          <br>
                                        </p>
                                      </div>
                                    </div></td>
      <td valign="top" width="30" class="specbundle">&nbsp;</td>
      <td valign="top" class="specbundle"><table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td valign="top" width="92" style="vertical-align: middle">
                                    <div class="contentEditableContainer contentFacebookEditable">
                                      <div class="contentEditable">
                                        <a target="_blank" href="https://play.google.com/store/apps/details?id=com.tailorgang"><img src="https://play.google.com/intl/en_us/badges/images/badge_new.png" width="92" alt="Developer Google" data-default="placeholder" data-max-width="92" data-customIcon="true"></a>
                                      </div>
                                    </div>
                                  </td>
      <td valign="top" width="16">&nbsp;</td>
      <td valign="top" width="92" style="vertical-align: middle">
                                    <div class="contentEditableContainer contentTwitterEditable">
                                      <div class="contentEditable">
                                        <a target="_blank" href="#"><img src="data:image/png;base64,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" width="92" alt="Developer Apple" data-default="placeholder" data-max-width="92" data-customIcon="true"/></a>
                                      </div>
                                    </div>
                                  </td>
    </tr>
  </tbody>
</table>
</td>
    </tr>
  </tbody>
</table>
</td>
    </tr>
    <tr><td height="88"></td></tr>
  </tbody>
</table>

        </div>

        <!-- =============================== footer ====================================== -->

      </td>
    </tr>
  </tbody>
</table>
</td>
      <td valign="top" width="40">&nbsp;</td>
    </tr>
  </tbody>
</table>
</td>
    </tr>
  </tbody>
</table>
</td>
    </tr>
  </tbody>
</table>
      </body>
      </html>`;}
/*
    Hello ${user.fullname},
    Welcome to an exciting world, where fashion and technology meets.
    You can now connect to an amazing line of fashion designers and their beautifully made clothes at just one click.
    And hey! You don’t have to worry if you want to learn how to sew for fun or to become a fashion designer, Tailorgang has all the tutorials you need and access to the professional instructors to help mentor you.
    So what are you Waiting for? Subscribe to our online classes with over 200 videos all in areas in fashion design.
    For further inquiries, kindly call or whatsapp 08111660968, 09022064149 or email: victorian@nugitech.com
    Thank you for choosing Tailorgang!Sales team
	*/
