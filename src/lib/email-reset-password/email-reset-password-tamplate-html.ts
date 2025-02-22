const emailResetPasswordTamplateHtml = (verifyUrl: string, userName: string) => `
<table width="100%" cellpadding="8" cellspacing="0">
   <tbody>
      <tr>
         <td>
            <table width="100%" cellpadding="0" cellspacing="0">
               <tbody>
                  <tr>
                     <td width="100%">
                        <table width="570" cellpadding="0" cellspacing="0">
                           <tbody>
                              <tr>
                                 <td>
                                    <h1>Reset Password</h1>
                                    <p>Hi ${userName}, we received a request to reset your password. Click the button below to set a new password.</p>
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                       <tr>
                                          <td align="center">
                                             <div style="margin: 0 auto"></div>
                                             <a href=${verifyUrl} style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
                                             </div>
                                          </td>
                                       </tr>
                                    </table>
                                    <p>Thanks, <br />DillahCodes</p>
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
   </tbody>
</table>`;

export default emailResetPasswordTamplateHtml;
