document.addEventListener('DOMContentLoaded',()=>{

        // Account Elements
        const regEmail=document.getElementById('reg-email');
        const regPassword=document.getElementById('reg-password');
        const regName=document.getElementById('reg-name');
        const regProfile=document.getElementById('reg-profile');
        const regProfilePreview=document.getElementById('reg-profile-preview');

        const loginEmail=document.getElementById('login-email');
        const loginPassword=document.getElementById('login-password');

        const logoutBtn=document.getElementById('logout-btn');
        const changePassBtn=document.getElementById('change-password-btn');
        const deleteAccBtn=document.getElementById('delete-account-btn');

        const accountLogged=document.getElementById('account-logged');
        const sidebarName=document.getElementById('sidebar-name');
        const sidebarProfile=document.getElementById('sidebar-profile');

        // Profile preview
        regProfile.addEventListener('change',e=>{
            const file=e.target.files[0];
            if(file){ const reader=new FileReader(); reader.onload=()=>regProfilePreview.src=reader.result; reader.readAsDataURL(file);}
        });

        // Register
        document.getElementById('register-btn').addEventListener('click',()=>{
            const email=regEmail.value.trim();
            const password=regPassword.value.trim();
            const name=regName.value.trim();
            const profile=regProfilePreview.src;
            if(!email||!password||!name){alert('সব তথ্য দিন'); return;}
            localStorage.setItem('account',JSON.stringify({email,password,name,profile}));
            alert('Account created! এখন login করুন');
            regEmail.value=regPassword.value=regName.value='';
        });

        // Login
        document.getElementById('login-btn').addEventListener('click',()=>{
            const account=JSON.parse(localStorage.getItem('account')||'{}');
            if(loginEmail.value===account.email && loginPassword.value===account.password){
                alert('Login successful!');
                document.getElementById('register-div').style.display='none';
                document.getElementById('login-div').style.display='none';
                accountLogged.style.display='flex';
                sidebarName.innerHTML=`<strong>${account.name}</strong>`;
                sidebarProfile.src=account.profile;
                loginEmail.value=''; loginPassword.value='';
            }else{alert('Email বা Password ভুল');}
        });

        // Logout
        logoutBtn.addEventListener('click',()=>{
            alert('Logged out');
            document.getElementById('register-div').style.display='block';
            document.getElementById('login-div').style.display='block';
            accountLogged.style.display='none';
            sidebarName.innerHTML='<strong>Shoham</strong>';
            sidebarProfile.src='aiicon.png';
        });

        // Change Password
        changePassBtn.addEventListener('click',()=>{
            const oldPass=prompt('Old Password লিখুন:');
            const account=JSON.parse(localStorage.getItem('account')||'{}');
            if(oldPass!==account.password){ alert('Old password ভুল'); return;}
            const newPass=prompt('New Password লিখুন:');
            account.password=newPass;
            localStorage.setItem('account',JSON.stringify(account));
            alert('Password changed!');
        });

        // Delete Account
        deleteAccBtn.addEventListener('click',()=>{
            if(confirm('নিশ্চিতভাবে Account মুছবেন?')){
                localStorage.removeItem('account');
                alert('Account deleted!');
                location.reload();
            }
        });

        // Load settings
        const soundToggle=document.getElementById('sound-toggle');
        const animToggle=document.getElementById('chat-anim-toggle');
        const translateToggle=document.getElementById('auto-translate-toggle');
        const notifyToggle=document.getElementById('notify-toggle');
        const voiceToggle=document.getElementById('voice-toggle');
        const themeToggle=document.getElementById('theme-toggle');

        const settings=JSON.parse(localStorage.getItem('chatSettings')||'{}');
        soundToggle.checked=settings.sound??true;
        animToggle.checked=settings.anim??true;
        translateToggle.checked=settings.translate??false;
        notifyToggle.checked=settings.notify??true;
        voiceToggle.checked=settings.voice??true;
        themeToggle.checked=settings.dark??false;
        if(themeToggle.checked) document.body.classList.add('dark');

        // Save Settings
        document.getElementById('save-settings-btn').addEventListener('click',()=>{
            localStorage.setItem('chatSettings',JSON.stringify({
                sound:soundToggle.checked,
                anim:animToggle.checked,
                translate:translateToggle.checked,
                notify:notifyToggle.checked,
                voice:voiceToggle.checked,
                dark:themeToggle.checked
            }));
            if(themeToggle.checked) document.body.classList.add('dark'); else document.body.classList.remove('dark');
            alert('Settings saved!');
        });

        // Wallpaper
        const wallpaperInput=document.getElementById('wallpaper-input');
        const saveWallpaperBtn=document.getElementById('save-wallpaper-btn');
        saveWallpaperBtn.addEventListener('click',()=>{
            const file=wallpaperInput.files[0];
            if(file){
                const reader=new FileReader();
                reader.onload=()=>{
                    document.body.style.backgroundImage=`url('${reader.result}')`;
                    localStorage.setItem('wallpaper',reader.result);
                };
                reader.readAsDataURL(file);
            }
        });
        const savedWallpaper=localStorage.getItem('wallpaper');
        if(savedWallpaper) document.body.style.backgroundImage=`url('${savedWallpaper}')`;

    });