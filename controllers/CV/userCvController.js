const AysncHandler = require('express-async-handler')
const UserCV = require("../../models/CV/userCV");


exports.addNewCv = AysncHandler (async (req, res)=>{
    const {
        achievements,
        certificationName,
        issuedBy,
        issuedDate,
        interest,
        languageName,
        proficiencyLevel,
        fullName,
        refJobTitle,
        companyName,
        email,
        phone,
        institution,
        eduCity,
        fieldOfStudy,
        yearOfGraduation,
        expJobTitle,
        employer,
        expCity,
        exStartDate,
        expEndDate,
        currentlyWorkHere,
        headerFirstName,
        headerLastName,
        headerPosition,
        headerCity,
        headerRegion,
        headerPhone,
        headerEmail,
        profilePic,
        skills,
        summary,

    } = req.body;

    const createdUserCv = await UserCV.create({
        achievements: {
            achievements
        },
        certification: {
            certificationName,
            issuedBy,
            issuedDate,
        },
        interest: {
            interest
        },
        language: {
            languageName,
            proficiencyLevel,
        },
        reference: {
            fullName,
            refJobTitle,
            companyName,
            email,
            phone,
        },
        education: {
            institution,
            eduCity,
            qualification: "Diploma",
            fieldOfStudy,
            yearOfGraduation
        },
        experience: {
            expJobTitle,
            employer,
            expCity,
            exStartDate,
            expEndDate,
            currentlyWorkHere
        },
        heading: {
            headerFirstName,
            headerLastName,
            headerPosition,
            headerCity,
            headerRegion,
            headerPhone,
            headerEmail,
            profilePic
        },
        skills: {
            skills
        },
        summary: {
            summary
        }
    })

    res.status(201).json({
        status: "seccess",
        message: "Cv created successfully",
        data: createdUserCv
    })
})

exports.getAllUserCv = AysncHandler (async (req, res)=>{

    const allCv = await UserCV.find({});
    if(allCv.length === 0){
        throw new Error("No Cv found");
    }

    res.status(201).json({
        status: "success",
        meassage: "All CV fetched successfully",
        data: allCv
    })
})

exports.updateUserCv = AysncHandler(async (req, res)=>{
    const {
        achievements,
        certificationName,
        issuedBy,
        issuedDate,
        interest,
        languageName,
        proficiencyLevel,
        fullName,
        refJobTitle,
        companyName,
        email,
        phone,
        institution,
        eduCity,
        fieldOfStudy,
        yearOfGraduation,
        expJobTitle,
        employer,
        expCity,
        exStartDate,
        expEndDate,
        currentlyWorkHere,
        headerFirstName,
        headerLastName,
        headerPosition,
        headerCity,
        headerRegion,
        headerPhone,
        headerEmail,
        profilePic,
        skills,
        summary,

    } = req.body

    const updatedUserCv = await UserCV.findByIdAndUpdate(req.params.id, {
        achievements: {
            achievements
        },
        certification: {
            certificationName,
            issuedBy,
            issuedDate,
        },
        interest: {
            interest
        },
        language: {
            languageName,
            proficiencyLevel,
        },
        reference: {
            fullName,
            refJobTitle,
            companyName,
            email,
            phone,
        },
        education: {
            institution,
            eduCity,
            qualification: "Diploma",
            fieldOfStudy,
            yearOfGraduation
        },
        experience: {
            expJobTitle,
            employer,
            expCity,
            exStartDate,
            expEndDate,
            currentlyWorkHere
        },
        heading: {
            headerFirstName,
            headerLastName,
            headerPosition,
            headerCity,
            headerRegion,
            headerPhone,
            headerEmail,
            profilePic
        },
        skills: {
            skills
        },
        summary: {
            summary
        }
    })
    res.status(201).json({
        status: "success",
        meassage: "CV Updted successfully",
        data: updatedUserCv
    })
})