import React, {useCallback, useEffect, useRef, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from 'screens/HomeScreen/HomeScreen';
import TabNavigation from './TabNavigationStack';
import {REFRESH_TOKEN_KEY, ROLE, SCREENS, TOKEN_KEY} from 'constants/constants';
import AuthScreen from 'screens/AuthScreen/Login';

import Notifications from 'screens/Notification/Notifications';
import ProfileInfoScreen from 'screens/Profile/Screens/ProfileInfoScreen';
import ResizeScreen from 'screens/Profile/Screens/ResizeScreen';
import IndexWeght from 'screens/Profile/Screens/IndexWeght';
import KBJUScreen from 'screens/Profile/Screens/KBJUScreen';
import BeforeAfterImage from 'screens/Profile/Screens/BeforeAfterImage';
import PersonalDocuments from 'screens/Profile/Screens/PersonalDocuments';
import ChooseFil from 'screens/Abonoment/screens/ChooseFil';
import ChooseAbonoments from 'screens/Abonoment/screens/ChooseAbonoments';
import ActivationAbonoment from 'screens/Abonoment/screens/ActivationAbonoment';

import MyTrain from 'screens/Abonoment/screens/MyTrain';
import ChooseTrain from 'screens/Abonoment/screens/ChooseTrain';
import InformationTrainer from 'screens/Abonoment/screens/InformationTrainer';
import PromoCode from 'screens/Abonoment/screens/PromoCode';
import Register from 'screens/AuthScreen/Register';
import Login from 'screens/AuthScreen/Login';

import ProfileScreen from 'screens/Profile';
import Onboarding from 'screens/Onboarding/Onboarding';
import MultiOnboardingComponent from 'screens/AuthScreen/MultiOnboardingComponent';

import HistoryBodyInfo from 'screens/Profile/Screens/HistoryBodyInfo';
import {storageDeleteItem, storageReadItem} from 'utils/asyncStorage';
import {removeBearerToken} from 'utils/axios';
import ClientInfo from 'screens/Admin/screens/ClientInfo';
import Documents from 'screens/Admin/screens/Documents';
import PlanFinance from 'screens/Admin/screens/FinancePlan/PlanFinance';
import Certificate from 'screens/Admin/screens/Certificate';
import BuyAbonoment from 'screens/Abonoment/screens/BuyAbonoment';
import TrainAndUsluga from 'screens/Abonoment/screens/TrainAndUsluga';
import FreezeScreen from 'screens/Admin/components/FreezeScreen';
import AnalizyWork from 'screens/Admin/screens/AnalizyWork/AnalizyWork';
import ForWhy from 'screens/Admin/screens/FinancePlan/components/ForWhy';
import AnalizyWorkChooseTrainer from 'screens/Admin/screens/AnalizyWork/components/AnalizyWorkChooseTrainer';
import CreateFinancePlan from 'screens/Admin/screens/FinancePlan/components/CreateFinancePlan';
import ForWhyTask from 'screens/Admin/screens/Tasks/components/ForWhyTask';

import TaskCreate from 'screens/Admin/screens/Tasks/components/TaskCreate';
import TasksWorkChooseTrainer from 'screens/Admin/screens/Tasks/components/TasksWorkChooseTrainer';
import Personal from 'screens/Admin/screens/Personal/Personal';
import PersonalDeitails from 'screens/Admin/screens/Personal/components/PersonalDeitails';
import TrainersDeitails from 'screens/Admin/screens/Personal/components/TrainersDeitails';
import TrainerSchedule from 'screens/Admin/screens/Personal/components/TrainerSchedule';
import AddPersonal from 'screens/Admin/screens/Personal/components/AddPersonal';
import {useAppDispatch, useAppSelector} from 'store/store';
import {getTokenStorage} from 'store/actions/auth';

// import CreateTasks from 'screens/Admin/screens/Tasks/components/CreateTasks';
const AppStack = () => {
  const Stack = createNativeStackNavigator();

  const tokens = useAppSelector(state => state.authSlice.tokens);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTokenStorage()).then(resp => console.log('prikol', resp));
  }, []);

  const AuthenticatedScreens = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={SCREENS.HOME}>
        <Stack.Screen name={SCREENS.HOME} component={TabNavigation} />

        <Stack.Screen name={SCREENS.PROFILE_DOCUMENTS} component={PersonalDocuments} />
        <Stack.Screen name={SCREENS.PROFILE_IMAGES} component={BeforeAfterImage} />
        <Stack.Screen name={SCREENS.PROFILE_KBZU} component={KBJUScreen} />
        <Stack.Screen name={SCREENS.PROFILE_MEASURE} component={ResizeScreen} />
        <Stack.Screen name={SCREENS.PROFILE_INFO} component={ProfileInfoScreen} />
        <Stack.Screen name={SCREENS.ABONEMENT_ABONOMENT_CHOOSE} component={ChooseAbonoments} />
        <Stack.Screen name={SCREENS.ABONEMENT_FILIAL} component={ChooseFil} />
        <Stack.Screen name={SCREENS.ABONOMENT_ACTIVATE} component={ActivationAbonoment} />
        <Stack.Screen name={SCREENS.ABONOMENT_BUY} component={BuyAbonoment} />
        <Stack.Screen name={SCREENS.ABONOMENT_TRAINER_USLUGA} component={TrainAndUsluga} />
        <Stack.Screen name={SCREENS.PROFILE}>{props => <ProfileScreen />}</Stack.Screen>
        <Stack.Screen name={SCREENS.CHOOSE_TRAINER} component={ChooseTrain} />
        <Stack.Screen name={SCREENS.TRAINER_INFO} component={InformationTrainer} />
        <Stack.Screen name={SCREENS.PROMOCODE} component={PromoCode} />
        <Stack.Screen name={SCREENS.ABONOMENT_TRAINER} component={MyTrain} />
        <Stack.Screen name={SCREENS.PROFILE_BODYMASSINDEX} component={IndexWeght} />
        <Stack.Screen name={SCREENS.ADMIN_CLIENT_INFO}>
          {props => <ClientInfo {...props} />}
        </Stack.Screen>
        <Stack.Screen name={SCREENS.ADMIN_DOCUMENTS} component={Documents} />
        <Stack.Screen name={SCREENS.ADMIN_PLAN_FINANCE} component={PlanFinance} />
        <Stack.Screen name={SCREENS.ADMIN_CERTIVIC} component={Certificate} />
        <Stack.Screen name={SCREENS.ADMIN_FREEZE} component={FreezeScreen} />
        <Stack.Screen name={SCREENS.PROFILE_HISTORY_INFO} component={HistoryBodyInfo} />
        <Stack.Screen name={SCREENS.ADMIN_ANALIZY_WORK} component={AnalizyWork} />
        <Stack.Screen name={SCREENS.ADMIN_FORWHY} component={ForWhy} />
        <Stack.Screen
          name={SCREENS.ADMIN_ANALIZY_WORK_CHOOSE_TRAINER}
          component={AnalizyWorkChooseTrainer}
        />
        <Stack.Screen name={SCREENS.ADMIN_CREATE_FINANCE_PLAN} component={CreateFinancePlan} />

        <Stack.Screen name={SCREENS.ADMIN_FORWHY_TASKS} component={ForWhyTask} />
        <Stack.Screen
          name={SCREENS.ADMIN_TASKSWORKCHOOSETRAINER}
          component={TasksWorkChooseTrainer}
        />
        <Stack.Screen name={SCREENS.ADMIN_CREATE_TASKS} component={TaskCreate} />
        <Stack.Screen name={SCREENS.ADMIN_PERSONAL_DETAILS} component={PersonalDeitails} />
        <Stack.Screen name={SCREENS.ADMIN_TRAINER_DETAILS} component={TrainersDeitails} />
        <Stack.Screen name={SCREENS.ADMIN_TRAINER_SCHEDULER_DETAILS} component={TrainerSchedule} />
        <Stack.Screen name={SCREENS.ADMIN_ADD_PERSONAL} component={AddPersonal} />
      </Stack.Navigator>
    );
  };

  const UnauthenticatedScreens = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={SCREENS.ONBOARDING}>
        <Stack.Screen name={SCREENS.ONBOARDING} component={Onboarding} />

        <Stack.Screen
          options={{gestureEnabled: false}}
          name={SCREENS.REGISTER}
          component={Register}
        />
        <Stack.Screen name={SCREENS.LOGIN}>{props => <Login />}</Stack.Screen>
        <Stack.Screen name={SCREENS.MULTIONBOARDING}>
          {props => <MultiOnboardingComponent />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  };

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {tokens && tokens.accessToken ? (
        <Stack.Screen name={SCREENS.AUTHENTICATED} component={AuthenticatedScreens} />
      ) : (
        <Stack.Screen name={SCREENS.UNAUTHENTICATED} component={UnauthenticatedScreens} />
      )}
    </Stack.Navigator>
  );
};

export default AppStack;
