# Full Deployment Tutorial

###### (Note 1: Tutorial assumes user is using Windows 7, 8, or 10 => modifications to steps may be necessary under macOS or Linux.)

###### (Note 2: For our deployment on Amazon EC2, we opted for a t2.xlarge instance (x4 vCPU, 16 GB memory, explicitly given 32 GB storage space) - this is because all 7 models deployed (and potentially running) simultaneously require greater than 4 GB memory and 8 GB storage space.)
</br>

## Backend

### Python3/Flask/nginx (Amazon EC2)/Gunicorn+Sockets

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_000_a.png )

</br></br>

## Frontend
### Angular CLI and Heroku

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_000_b.png )

</br></br></br>

Deployment for our semester project is ultimately broken down into two halves - backend deployment and frontend deployment.

</br>

## Getting Started


In order to replicate this setup, this guide should be followed nearly (if not entirely) step-by-step.   <u>Using "sudo" when or where you shouldn't</u>, <u>missing a step while creating the Python3 virtual environments</u>, <u>forgetting to modify the package.json before pushing to Heroku</u>, <u>etc.</u> - all of these examples can break the project and keep you from progressing until you've figured out why.   Try to pay close attention and be cautious to avoid pitfalls - <b>you have been warned.</b>
</br></br>

### Prerequisites

Expectations of the reader:


1. Relative knowledge of **Python 2 and 3**, <b>Flask</b>, a working knowledge of <b>navigating Linux via the terminal (Bash)</b>, rudimentary understanding of what a website domain is, HTTP/HTTPS protocol(s), and TCP/IP syntax/conventions.

  * <i>(If following this guide line for line, a <b>credit card</b> with or without an adult for <b>Amazon EC2</b> and <b>name.com</b> registrations.  If desired, alternative hosting and domain registration can likely be obtained for free, but that is outside the scope of this guide.)</i>
   
2. Basic experience with CLI interface tools - ideally, even limited previous experience with <b>Angular</b> and <b>Heroku</b>.

</br></br>
# Part 1: Backend Setup

### 1.1 Installing 
##### (Installation of applications will not be covered - but installations that are needed throughout the tutorial will be listed below)

1. Install both [<b>PuTTY (x64 MSI)</b>](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) and [<b>WinSCP</b>](https://winscp.net/eng/download.php) for backend server access and navigation.

This is all that should be needed on the client-side while setting up the backend server.

## 1.2 Setting up an Amazon (AWS) EC2 instance

1.2.1.  First navigate to https://aws.amazon.com/ec2/ 

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_005.PNG?raw=true )

</br></br>

1.2.1a.  Prices and specs as of 5/10/19:

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_005_a.png?raw=true )
</br></br>

1.2.2.  Under AWS services -> Find Services -> Click on "EC2"

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_006.PNG?raw=true )
</br></br>

1.2.3.  On the left, under EC2 Dashboard -> Click on "Instances"

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_007.PNG?raw=true )
</br></br>

1.2.4.  Click "Launch Instance"

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_008.PNG?raw=true )
</br></br>

1.2.5. Select "Amazon Linux 2 AMI (HVM), SSD Volume Type, 64-bit (x86)

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_009.PNG?raw=true )
</br></br>

1.2.6.  For this specific project, we chose the <b>t2.xlarge</b> configuration for >8 GB RAM for the instance

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_010.PNG?raw=true )
</br></br>

1.2.7.  Click "4. Add Storage"

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_011.PNG?raw=true )
</br></br>

1.2.8.  Change the capacity size from the default of 8 GB to something larger (we opted for 32 GB)

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_012.PNG?raw=true )
</br></br>

1.2.9.  Click "6. Configure Security Group"

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_013.PNG?raw=true )
</br></br>

1.2.10.  Create a new security group with the exact configuration listed below.  Security group name and description can be anything you want.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_014.PNG?raw=true )
</br></br>

1.2.11.  Review Instance - when you're ready, click "Launch"

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_015.PNG?raw=true )
</br></br>

1.2.12.  AWS will prompt you to create a new key-pair or use an existing key-pair.   <b>Create a new key-pair.</b>  Key-pair name can be anything you want.  <b>Download your key-pair file to a safe location and do not lose it.</b>

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_016.PNG?raw=true )
</br></br>

1.2.13.  After the previous step is finished, go to your Start Menu, find the PuTTY folder and launch PuTTYgen (comes with PuTTY installation by default)

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_017.png )
</br></br>

1.2.14.  PuTTY does not natively recognize Amazon's key-pair file, but PuTTYgen will convert it to a compatible format for PuTTY --- <b>Click "Load"</b>.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_018.PNG?raw=true )
</br></br>

1.2.15.  Make sure to <b>click on the dropdown menu</b> for the file extension type and change it to display <b>"All Files (*.*)"</b>

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_019.png)
</br></br>

1.2.16.  PuTTYgen will import the key-pair file downloaded from AWS.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_020.PNG?raw=true )
</br></br>

1.2.17.  Leave every field empty and click <b>"Save private key"</b> - when PuTTY asks if you are sure you want to save the key without a passphrase, click <b>"Yes"</b> (we're sure.)   Save it in a safe place where you won't lose it.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_021.PNG?raw=true )
</br></br>

1.2.18.  Open up the actual PuTTY application.   You'll be greeted by this window (without the 'Models' saved session.)  This is the main part of PuTTY that will be used most often.  Host name format will be <b>ec2-user</b> + <b>@</b> + <b>EC2-instance-public-address</b>.  (+'s omitted)   Once settings are input properly, <b>type a name for your connection inside the field under "Saved Sessions"</b> and click <b>"Save"</b>.  Leave the port as 22.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_022.PNG?raw=true )
</br></br>

1.2.18a.  Note that the EC2 instance public address can be located in the AWS EC2 console dashboard - under "Public DNS (IPv4)" (the address inside the blue box in the picture below.)   <b>Keep in mind that these addresses change every time you relaunch or restore an instance from a backup.</b>

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_022_a.png?raw=true )

1.2.19.  On the left side of the application window under "Category:", <b>click on "SSH"</b> and expand its subcategories.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_023.PNG?raw=true )
</br></br>

1.2.20.   Within "SSH"'s subcategories, <b>click on "Auth"</b> ("Auth" does not need to be expanded.)  Then <b>click "Browse"</b> and locate your private key file that was converted by PuTTYgen.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_024.PNG?raw=true )
</br></br>

1.2.21.   Select your converted (.ppk) key-pair file and <b>click "Open"</b>.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_025.PNG?raw=true )
</br></br>

1.2.22.  If you have not named your "Saved Session" yet, go ahead and type a name into the field under "Saved Sessions" now - otherwise, just click on the name you gave your session in the list.  <b>Click "Save"</b> to save your details.  <u>From now on, all you'll have to do to connect to your session is load PuTTY and double click on the session name!</u>

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_026.PNG?raw=true )
</br></br>

1.2.23.  After <b>double-clicking on the session name</b>, or clicking it once and then <b>clicking "Open"</b>, you will be presented with a terminal session directly connected to your AWS server instance (as seen below.)

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_027.PNG?raw=true )
</br></br>

1.2.24.  To setup WinSCP, start the application up.  Make sure the <b>File protocol is set as "SFTP"</b> - host name is the same as it was for PuTTY, <b><u>only this time you do not put "ec2-user@" in front of the address.</b></u>   Instead, put "ec2-user" in the User name field.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_028.PNG?raw=true )
</br></br>

1.2.25.  <b>Click "Save", then click "Advanced".</b>

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_029.PNG?raw=true )
</br></br>

1.2.26.  Within the categories to the left of the "Advanced Site Settings" window, <b>click on "Authentication"</b>, under SSH.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_030.PNG?raw=true )
</br></br>

1.2.27.  To the right of the "Private key file:" field, <b>click on the trailing "..." button.</b>

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_031.PNG?raw=true )
</br></br>

1.2.28.  Select your converted .ppk key-pair file that was generated by PuTTYgen - same as before in the PuTTY setup.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_032.PNG?raw=true )
</br></br>

1.2.29.  Click "OK" until you get back to the initial WinSCP application window.   <b>Click "Save" again, and then click "Login".</b>   You will be presented with the bottom screen - <u>you now have FTP access to the backend server.</u>   The left half of WinSCP is your local computer's file system.   The right half of WinSCP is the remote computer's (the AWS instance) file system.   <b>Now you can transfer files/directories between systems.</b>

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_033.PNG?raw=true )
</br></br>

1.2.30.  To properly prepare the server for the following steps, copy the "backend-models" directory from our repository to /home/ec2-user.   Then execute the following commands:
</br></br></br>
```
sudo yum install nginx
sudo cp /home/ec2-user/backend-models/conf_files/nginx.conf /etc/nginx/nginx.conf
sudo cp /home/ec2-user/backend-models/conf_files/backend-models /etc/nginx/sites-available/backend-models
sudo ln -s /etc/nginx/sites-available/backend-models /etc/nginx/sites-enabled/
```

If you receive errors that the sites-available and/or sites-enabled directories do not exist, just go ahead and create them with the following, and then try the above commands again:
</br></br></br>
```
sudo mkdir /etc/nginx/sites-available
sudo mkdir /etc/nginx/sites-enabled
```
</br></br></br>


1.2.30.  <b>Name.com</b> was utilized for a simpler domain for the frontend to connect to.   Create an account and search for your desired domain to see if it can be purchased for a reasonable price.   We were able to secure our domain with SSL certificates for ~ $15 total for 1-year.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_034.PNG?raw=true )
</br></br>

1.2.31.  Search for your desired domain name to see if it is available.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_035.PNG?raw=true )
</br></br>

1.2.32.  As an example - this domain is available for $8.99 for a 1-year registration.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_036.PNG?raw=true )
</br></br>

1.2.33.  The $4.99 seems like a sneaky charge, but that is actually going to provide us with our SSL certificate(s).   So leave it on there.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_037.PNG?raw=true )
</br></br>

1.2.34.  After you have successfully registered the domain, after you login again, click on the blue "My Domains" button at the top of the page.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_038.PNG?raw=true )
</br></br>

1.2.35.  In this case, <b>our domain is maas-umkc.com.</b>   But if you are adapting this tutorial to fit your own needs, obviously the domain can be anything you want - so long as you can afford to register it!

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_039.PNG?raw=true )
</br></br>

1.2.36.  This is Name.com's domain dashboard.   The options to the left of "Domain Details" are all the different tools that Name.com provides for you to use with your domain.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_040.PNG?raw=true )
</br></br>

1.2.37.  If you <b>click on "DNS Records"</b>, by default, you will have two DNS rules - one with a wildcard + "." + "your domain" + ".com", the second is just "your domain" + ".com".   Edit both of these entries and put your AWS <b>IPv4 Public IP</b> in as the answers. 

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_041.png?raw=true )
</br></br></br>

1.2.38.  Screenshots were not obtained for this part, but in order to activate/use the SSL certificate(s) that were just purchased, Name.com needs a .csr file from the server itself.   This sounds complicated, but it's pretty easy.   Just use PuTTY to access a terminal for your AWS EC2 instance.   Within the terminal, type the following <b>(to generate a .csr file and a .key file):</b>
</br>

```
openssl req -new -newkey rsa:2048 -nodes -keyout your-server-name.key -out your-server-name.csr
```


<b>"your-server-name" is arbitrary and can be whatever you choose.</b>   We named ours "baseball" again.
</br></br>
<b><u>Note that this will generate TWO files - the .csr file and a .key file.   Both are important and both will be needed relatively soon.</b></u>
</br></br>

  * While answering the prompts during .csr generation, answer every question the best you can - <b>we used www.maas-umkc.com as our "Common Name" and we did not initialize a challenge password.</b>
  * If further reading is desired for how to generate a .csr file, this is the guide we followed: https://www.thorntech.com/2015/08/setting-up-an-ssl-certificate-for-use-with-amazon-web-services-elb/
  * Now just navigate to the newly created .csr file with WinSCP - right click on the .csr file and choose "Edit" to open it up in a text editor.
  * Copy/paste the contents of the .csr file into the requested section of Name.com (under your domain's "Advanced Security") - this will allow Name.com to generate the SSL certificate(s).
  * If further reading is desired, here is Name.com's official guide on how to do what we just described: https://www.name.com/support/articles/205190838-Setting-up-an-SSL-certificate-that-is-not-hosted-by-Name-com .
</br></br></br>

1.2.39.  Now if you go to Name.com and click on "Advanced Security", you will see a screen similar to that below.  If you wish to access your raw SSL certificate(s) at anytime, just <b>click "Show SSL certificate".</b>

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_042.PNG?raw=true )

</br></br>

1.2.40.  Again, <b>click "Show Certificates".</b>

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_043.PNG?raw=true )
</br></br>

1.2.41.  The certificates are now displayed as plaintext.   They can be copy/pasted into a .txt document and moved to the server via WinSCP.   They should be copy/pasted in a style similar to what is shown in the picture below for 1.2.42 - no empty lines above or below the text, and both certificates should be saved in <b>one .txt file</b>.   

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_044.png?raw=true )
</br></br>

1.2.42.  Save the "Server Certificate" and "CA Certificates" plaintext in one .txt file as shown below.  Name the file whatever you want it to be, <b>but be sure that the file extension is changed from ".txt" to ".pem".</b>   <b>We saved ours as "certificate.pem".</b>

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_045.png?raw=true )
</br></br></br>

1.2.43.  Proper plaintext format of certificate, CA certificates, and private key are reiterated in the screenshot below.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_046.png?raw=true )
</br></br></br>

1.2.44.  At the top of our supplied "backend-models" nginx server config file (which should be at <b>/etc/nginx/sites-available/backend-models</b>), you must specify where the ssl_certificate .pem file and where the ssl_certificate_key .key file are located on the server.   The given information in this screenshot is where <b>our</b> files are - yours can be anywhere on the server that you want, so long as you can provide their location.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_047_a.PNG?raw=true )
</br></br>

1.2.45.  Just below the certificate locations in the config file, there is a comment that recommends to generate unique DH parameters.   Go ahead and type the following command into the terminal and wait for it to complete its execution.  It will store the results in the file in the location that is referenced in the following command.
</br></br>
```
openssl dhparam -out /etc/pki/nginx/dhparams.pem 2048
```
</br>

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_047.PNG?raw=true )

</br></br>

1.2.46.  Everything in the "backend-models" config file for nginx can remain the same (or can be modified per your needs, so long as you know what you're modifying) - the only thing that <b>NEEDS</b> to be evaluated is the server block at the very bottom of the file.   This is the part of the config file that will take any HTTP requests and automatically redirect them to HTTPS instead.  In the return line, you must type the actual name of your domain within the redirect address.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_048.PNG?raw=true )
</br></br></br>

1.2.47. <b><u>Congratulations - the hardest parts are officially over!</u></b>   Everything from this point forward should (hopefully) be easy/smooth sailing.  Go to PuTTY and type the following command to install Python 3 (specifically Python 3.6) to the AWS EC2 instance. 

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_049.PNG?raw=true )
</br></br></br>

1.2.48.  If it hasn't been done already, use WinSCP to copy the "backend-models" directory from our repository over to /home/ec2-user/.  Then follow along with the commands in the following screenshot - <b>cd backend-models</b>, <b>ls</b> (to see the individual model folders), <b>cd DenseNet121</b> (enter the first model's folder.)

We are going to create an individual virtual environment for each model.  So type <b>python36 -m venv DenseNet121</b> to create a new virtual environment (under Python 3.6!)  After the <b>ls</b> command in the screenshot, the blue DenseNet121 listing is the directory for the virtual environment we just created.  Type <b>source DenseNet121/bin/activate</b> to activate/enter the virtual environment.

<b>Note that you know you're currently in a virtual environment if you can see the virtual environment's name in parens on the far left of the current console line.</b>

Once in the virtual environment, type <b>python36 -m pip install -r requirements.txt</b> to install the specific dependencies for the model's Python 3.6 environment.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_050.PNG?raw=true )
</br></br></br>

1.2.49.  After all of the dependencies have been installed, you can test the Python script and the virtual environment from within the AWS EC2 instance itself.   Open another PuTTY window and type <b>sudo yum install lynx</b> - this will install a very, very basic terminal web browser.   Lynx is not good enough to browse the Internet we know and love, but it is going to be good enough for testing purposes here.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_051.PNG?raw=true )
</br></br></br>

1.2.50.  In the terminal that is currently housing the virtual environment, type <b>gunicorn --bind 127.0.0.1:64000 DenseNet121</b>.   Gunicorn will launch the Python script (DenseNet121.py) and bind it to port 64000.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_052.PNG?raw=true )
</br></br></br>

1.2.51.  In the second terminal, after DenseNet121.py is fully loaded, go ahead and type:
```
lynx http://127.0.0.1:64000/DenseNet121
```
![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_053.PNG?raw=true )
</br></br></br>

1.2.52.  If you are greeted with the print statement "DenseNet121 Model", then that means the virtual environment is working, Gunicorn is working, and you can successfully navigate to the Flask application via HTTP.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_054.PNG?raw=true )
</br></br></br>

1.2.53.  After you are finished with 1.2.52, type <b>deactivate</b> to exit the virtual environment.

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_055.PNG?raw=true )
</br></br></br>

1.2.54. <b> Now repeat steps 1.2.48-1.2.53 for the remaining 6 models to properly install each model's individual virtual environment and test that they will be accessible via lynx.</b>
</br></br></br>

1.2.55.  In our <b>/etc/nginx/sites-available/backend-models</b> config file, each model has its own route, and each route is defined with a <b>"location" block</b> that begins like the following:

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_058.PNG?raw=true )

The "^~" operator tells nginx that any route that exactly matches or begins with "/DenseNet121" needs to follow the rules defined in this location block.  Each of these location blocks has a wide-open CORS configuration that was found here (https://enable-cors.org/server_nginx.html), and each tells nginx that it needs to proxy to a defined socket within the file system.  <b>Now we have to create the init files that will create those sockets on every boot.</b>
</br></br></br>

1.2.56.  For each model, perform the following commands:
</br></br>
```
sudo nano /etc/init/model_name_here.conf
```
</br></br>

And add the following lines for each file (DenseNet121 shown here):
</br></br>

![img]( https://github.com/cjdw94/CS-5551-Project-4/blob/master/readme_assets/img_059.PNG?raw=true )

</br>

<b>Hit CTRL+O to write to the file (save to the file), and then hit CTRL+X to exit out of nano.   Repeat for the next 6 models.  </b>   This will make sure that each model runs automatically whenever the server boots.
</br></br></br>

1.2.57.  Lastly - we need to start the nginx server, and we need to be sure that it will start automatically whenever the AWS EC2 instance boots.   Type the following into the terminal:
</br></br>
```
sudo chkconfig nginx on
```
</br></br>

1.2.58.  <b>Congratulations - that's it for the backend server setup!  =D</b>

</br></br></br>

# Part 2: Frontend Setup (to come soon)

## Authors

* **Corey Doss** - *Deployment Tutorial*
