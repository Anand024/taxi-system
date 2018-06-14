import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DriverComponent } from './driver/driver.component';
import { ActivityDashboardComponent } from './auth/activity-dashboard/activity-dashboard.component';
import { AddDriverComponent } from './driver/add-driver/add-driver.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'forgotPassword',
        component: ForgotPasswordComponent
    },
    {
        path: 'resetPassword',
        component: ResetPasswordComponent
    },
    {
        path: 'driver',
        component: DriverComponent
    },
    { path: 'driver/addDriver', component: AddDriverComponent },
    { path: 'driver/editDriver/:driverId', component: AddDriverComponent },
    {
        path: 'activityDashboard',
        component: ActivityDashboardComponent
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
