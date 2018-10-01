import React from 'react';
import HomePage from '../Screens/HomePage';
import EnrollmentForm from '../Screens/EnrollmentForm';
import ListEnrollment from '../Screens/ListEnrollment';
import FaceRecognition from '../Screens/FaceRecognition';
import ProfileData from '../Screens/ProfileData';
import Login from '../Screens/Login';
import EnrolmentList from '../Screens/EnrolmentList';
import DashBoard from '../Screens/DashBoard';
import EnrolFaceDetection from '../Screens/EnrolFaceDetection';
import DetectedView from '../Screens/DetectedView';
import OTPVerification from '../Screens/OTPVerification';
import Menu from '../Screens/Menu';
import NewFile from '../Screens/NewFile';
import AddUser from '../Screens/AddUser';
import HeaderBar from '../Screens/HeaderBar';
import DetectMatched from '../Screens/DetectMatched';
import MatchedListPage from '../Screens/MatchedListPage';
import IndividualPersonList from '../Screens/IndividualPersonList';
import FaceBookDetect from '../Screens/FaceBookDetect';
import PersonsList from '../Screens/PersonsList';
import FaceBookMatchedDetails from '../Screens/FaceBookMatchedDetails';
import TotalMatchedListPage from '../Screens/TotalMatchedListPage';
import FaceBookTotalMatchedListPage from '../Screens/FaceBookTotalMatchedListPage';
import TotalSearchListPage from '../Screens/TotalSearchListPage';
import FaceBookTotalSearchListPage from '../Screens/FaceBookTotalSearchListPage';
import EditPerson from '../Screens/EditPerson';
import UpdatePerson from '../Screens/UpdatePerson';




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
    } else if (route.name === 'list-enrollment') {
        return (
            <ListEnrollment navigator = { navigationOperations } />
      );
    }  else if (route.name === 'profile-data') {
        return (
            <ProfileData navigator = { navigationOperations } rowData= {route.rowData} />
        );
    } else if (route.name === 'login') {
        return (
            <Login navigator = { navigationOperations } rowData= {route.rowData} />
        );
    } else if (route.name === 'enrolment-list') {
        return (
            <EnrolmentList navigator = { navigationOperations } rowData= {route.rowData} />
        );
    } else if (route.name === 'dash-board') {
        return (
            <DashBoard navigator = { navigationOperations } rowData= {route.rowData} />
        );
    } else if (route.name === 'enrol-face-detection') {
        return (
            <EnrolFaceDetection navigator = { navigationOperations } rowData= {route.rowData} />
        );
    } else if (route.name === 'detected-view') {
        return (
            <DetectedView navigator = { navigationOperations } rowData= {route.rowData} />
        );
    } else if (route.name === 'otp-verification') {
        return (
            <OTPVerification navigator = { navigationOperations } rowData= {route.rowData} />
        );
    } else if (route.name === 'menu') {
        return (
            <Menu navigator = { navigationOperations } rowData= {route.rowData} />
        );
    }else if (route.name === 'new-file') {
        return (
            <NewFile navigator = { navigationOperations } rowData= {route.rowData} />
        );
    }else if (route.name === 'header-bar') {
        return (
            <HeaderBar navigator = { navigationOperations } rowData= {route.rowData} />
        );
    }else if (route.name === 'add-user') {
        return (
            <AddUser navigator = { navigationOperations } rowData= {route.rowData} />
        );
    }else if (route.name === 'matched-list-page') {
        return (
            <MatchedListPage navigator = { navigationOperations } rowData= {route.rowData} />
        );
    }else if (route.name === 'individual-person-list') {
        return (
            <IndividualPersonList navigator = { navigationOperations } rowData= {route.rowData} />
        );
    }else if (route.name === 'face-book-detect') {
        return (
            <FaceBookDetect navigator = { navigationOperations } rowData= {route.rowData} />
        );
    }else if (route.name === 'persons-list') {
        return (
            <PersonsList navigator = { navigationOperations } rowData= {route.rowData} />
        );
    }else if (route.name === 'facebook-matched-details') {
        return (
            <FaceBookMatchedDetails navigator = { navigationOperations } rowData= {route.rowData} />
        );
    }else if (route.name === 'total-matched-list-page') {
        return (
            <TotalMatchedListPage navigator = { navigationOperations } rowData= {route.rowData} />
        );
    }else if (route.name === 'facebook-total-matched-list-page') {
        return (
            <FaceBookTotalMatchedListPage navigator = { navigationOperations } rowData= {route.rowData} />
        );
    }else if (route.name === 'total-search-list-page') {
        return (
            <TotalSearchListPage navigator = { navigationOperations } rowData= {route.rowData} />
        );
    }else if (route.name === 'facebook-total-search-list-page') {
        return (
            <FaceBookTotalSearchListPage navigator = { navigationOperations } rowData= {route.rowData} />
        );
    }else if (route.name === 'edit-person') {
        return (
            <EditPerson navigator = { navigationOperations } rowData= {route.rowData} />
        );
    }else if (route.name === 'detect-matched') {
        return (
            <DetectMatched navigator = { navigationOperations } rowData= {route.rowData} />
        );
    }else if (route.name === 'update-person') {
        return (
            <UpdatePerson navigator = { navigationOperations } rowData= {route.rowData} />
        );
    }


}
