import React from 'react';
import HomePage from '../Screens/HomePage';
import EnrollmentForm from '../Screens/EnrollmentForm';
import ListEnrollment from '../Screens/ListEnrollment';
import FaceRecognition from '../Screens/FaceRecognition';
import ProfileData from '../Screens/ProfileData';

export default function(route, navigationOperations, onComponentRef) {
    _navigator = navigationOperations;
    pageOn = route.name;

    if (route.name === 'face-recognition') {
        return (
            <FaceRecognition navigator = { navigationOperations }  />
        );
    } else if (route.name === 'home-page') {
        return (
            <HomePage navigator = { navigationOperations } />
        );
    } else if (route.name === 'enrollment-form') {
        return (
            <EnrollmentForm navigator = { navigationOperations } />
        );
    }
    else if (route.name === 'list-enrollment') {
        return (
            <ListEnrollment navigator = { navigationOperations } />
        );
    }
    else if (route.name === 'profile-data') {
        return (
            <ProfileData navigator = { navigationOperations } rowData= {route.rowData} />
        );
    }




}
