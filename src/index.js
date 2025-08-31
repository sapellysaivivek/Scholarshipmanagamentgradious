const express = require('express');
const bcrypt = require('bcrypt');
const { loginregisdata, admin, student , adminlogindata , formdatas} = require('./confid');
const Notifications = require("./Notifications")
const appstudents = require("./appliedStudents")
const applyrout = require("./applyrout")
const notificationsdatas = require("./notificationsdatas");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

console.log(applyrout)

async function handleLogin(req, res) {
    console.log("hi")
    
    try {
        let Model = null;
        let user = await loginregisdata.findOne({ email: req.body.email });

        if (user) {
            Model = loginregisdata;
        } else {
            user = await adminlogindata.findOne({ email: req.body.email });
            if (user) {
                Model = adminlogindata;
            }
        }

        if (!user) {
            return res.send("User not found");
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            return res.send("Wrong password");
        }

       if (Model === loginregisdata) {
    const scholarship = await formdatas.find({});
    const notifications = await notificationsdatas.find({})
     res.render("dashbord", { scholarship: scholarship, selectedScholarship: null ,notification: notifications});
}

         else if (Model === adminlogindata) {
            const students = await student.find({});
            const admins = await admin.find({});
            res.render("admindashbord", { admins, students });
        }

    } catch (error) {
        console.error(error);
        res.send("Error during login");
    }
}


// Reusable signup handler
async function handleSignup(Model, req, res) {
    try {
        const existingUser = await Model.findOne({ email: req.body.email });

        if (existingUser) {
            return res.send("User1 already exists");
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await Model.create({
            email: req.body.email,
            password: hashedPassword
        });

        console.log(newUser);

        
        res.redirect("/")

    } catch (error) {
        console.error(error);
        res.send("Signup failed");
    }
}

// Routes
app.get('/', (req, res) => res.render('login'));
app.post('/', (req, res) => handleLogin(req, res));

app.get('/sigup', (req, res) => res.render('sigup'));
app.post('/sigup', (req, res) => handleSignup(student, req, res));

app.get('/adminsignup', (req, res) => res.render('adminsignup'));
app.post('/adminsignup', (req, res) => handleSignup(admin, req, res));
app.get('/applyform',(req, res)=>{
    res.render('applyform')
})
app.delete('/delete-student/:email', async (req, res) => {
    try {
        const email = decodeURIComponent(req.params.email);

        const result = await loginregisdata.deleteOne({ email });

        if (result.deletedCount > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "Student not found" });
        }

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error deleting student" });
    }
});

app.put('/approve-student/:email', async (req, res) => {
    try {
        const email = decodeURIComponent(req.params.email);

        const studentUser = await student.findOne({ email });
        if (!studentUser) {
            return res.json({ success: false, message: "Student not found." });
        }

        const existingApproved = await loginregisdata.findOne({ email });
        if (existingApproved) {
            return res.json({ success: false, message: "Student already approved." });
        }

        await loginregisdata.create({
            email: studentUser.email,
            password: studentUser.password
        });

        await student.deleteOne({ email });

        res.json({ success: true, message: "Student approved successfully." });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error approving student." });
    }
});

app.put('/approve-admin/:email', async (req, res) => {
    const email = decodeURIComponent(req.params.email);

    const adminUser = await admin.findOne({ email });
    if (!adminUser) {
        return res.json({ success: false, message: "Admin not found." });
    }

    const existingApproved = await adminlogindata.findOne({ email });
    if (existingApproved) {
        return res.json({ success: false, message: "Admin already approved." });
    }

    await adminlogindata.create({
        email: adminUser.email,
        password: adminUser.password
    });

    await admin.deleteOne({ email });

    res.json({ success: true, message: "Admin approved successfully." });
});
app.delete("/delete-admin/:email", async (req, res) => {
  try{
    const email =decodeURIComponent(req.params.email);
    const adminUser = await admin.findOne({email});
    if (!adminUser) {
        return res.json({ success: false, message: "Admin not found." });
        }
        await admin.deleteOne({email});

        res.json({ success: true, message: "Admin deleted successfully." });
        } catch (error) {
            console.error(error);
            res.json({ success: false, message: "Error deleting admin." });
            }
  });
  app.get('/forms', (req, res) => {
    res.render('forms');   
});
app.post("/form", async (req, res) => {
    console.log("succwsss")
    try {
        const { scholarship_name, about_Scholarship, scholarship_conditions, scholarship_url} = req.body;

        await formdatas.create({
            scholarship_name,
            about_Scholarship,
            scholarship_conditions,
            scholarship_url
        });
        res.send("succssful");

    } catch (error) {
        console.error(error);
        res.send("Error creating scholarship.");
    }
});

app.get('/dashboard', async (req, res) => {
    try {
        const scholarships = await formdatas.find({});
        const notification = await notificationsdatas.find({});
        let selectedScholarship = null;

        if (req.query.id) {
            selectedScholarship = await formdatas.findById(req.query.id);
        }

        res.render('dashbord', { scholarship: scholarships, selectedScholarship, notification: notification });

    } catch (error) {
        console.error(error);
        res.send("Error loading dashboard.");
    }
});
app.get('/scholarships/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const selectedScholarship = await ScholarshipModel.findById(id); // MongoDB example

        if (!selectedScholarship) {
            return res.status(404).send("Scholarship not found");
        }

        res.render('scholarshipDetails', { selectedScholarship });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
app.use('/notifications',Notifications);
app.use("/appliedStudents", appstudents)
app.use("/applyrout" , applyrout)
// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
