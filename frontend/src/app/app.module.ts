import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterBarComponent } from './shared/footer-bar/footer-bar.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Model1Component} from './pages/model1/model1.component';
import {DenseNet121Component} from './pages/models/dense-net121/dense-net121.component';
import { InceptionV3Component } from './pages/models/inception-v3/inception-v3.component';
import { MobileNetComponent } from './pages/models/mobile-net/mobile-net.component';
import { NasnetComponent } from './pages/models/nasnet/nasnet.component';
import { ResNet50Component } from './pages/models/res-net50/res-net50.component';
import { VGG16Component } from './pages/models/vgg16/vgg16.component';
import { XceptionComponent } from './pages/models/xception/xception.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';

const config = {
  apiKey: "AIzaSyDVHtMnoOSztW5-MLTbSu4Zr_AAYOCx1AM",
  authDomain: "finalproject-4eb7f.firebaseapp.com",
  databaseURL: "https://finalproject-4eb7f.firebaseio.com",
  projectId: "finalproject-4eb7f",
  storageBucket: "finalproject-4eb7f.appspot.com",
  messagingSenderId: "897954838228",
  appId: "1:897954838228:web:c0f3b2be52397aea"
};

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideNavComponent,
    HomeComponent,
    FooterBarComponent,
    Model1Component,
    DenseNet121Component,
    InceptionV3Component,
    MobileNetComponent,
    NasnetComponent,
    ResNet50Component,
    VGG16Component,
    XceptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AngularFireDatabaseModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
