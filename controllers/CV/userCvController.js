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
        HeaderPosition,
        HeaderCity,
        headerRegion,
        headerPhone,
        headerEmail,
        profilePic,
        skills,
        Summary,

    } = req.body

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
            HeaderPosition,
            HeaderCity,
            headerRegion,
            headerPhone,
            headerEmail,
            profilePic
        },
        skills: {
            skills
        },
        summary: {
            Summary
        }
    })

    res.status(201).json({
        status: "seccess",
        message: "Cv created successfully",
        data: createdUserCv
    })
})

