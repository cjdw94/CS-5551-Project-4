import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {Model1Component} from './pages/model1/model1.component';
import {DenseNet121Component} from './pages/models/dense-net121/dense-net121.component';
import {InceptionV3Component} from './pages/models/inception-v3/inception-v3.component';
import {MobileNetComponent} from './pages/models/mobile-net/mobile-net.component';
import {XceptionComponent} from './pages/models/xception/xception.component';
import {VGG16Component} from './pages/models/vgg16/vgg16.component';
import {ResNet50Component} from './pages/models/res-net50/res-net50.component';
import {NasnetComponent} from './pages/models/nasnet/nasnet.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home',  pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  {path: 'model1', component: Model1Component},
  {path: 'DenseNet121', component: DenseNet121Component},
  {path: 'InceptionV3', component: InceptionV3Component},
  {path: 'MobileNet', component: MobileNetComponent},
  {path: 'Nasnet', component: NasnetComponent},
  {path: 'ResNet50', component: ResNet50Component},
  {path: 'VGG16', component: VGG16Component},
  {path: 'Xception', component: XceptionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
