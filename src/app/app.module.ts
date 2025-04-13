import { isDevMode, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import {provideRouter} from "@angular/router";
import { CommonModule } from "@angular/common";
import {AppRoutingModule, routes} from "./app.routes";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EFFECTS} from './store/store.config';
import {NavbarComponent} from './components/navbar/navbar.component';
import {PricePipe} from './pipes/price.pipe';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {productFeatureKey, productReducer} from './store/product/product.reducer';
import {leltarFeatureKey, leltarReducer} from './store/leltar/leltar.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    StoreModule.forRoot({
      [productFeatureKey]: productReducer,
      [leltarFeatureKey]: leltarReducer
    }),
    EffectsModule.forRoot([...EFFECTS]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    NavbarComponent,
    PricePipe
  ],
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyCTHecpTGNxMfG1PQOvDtxT6-19QlzW6h0",
      authDomain: "webkert-9530f.firebaseapp.com",
      projectId: "webkert-9530f",
      storageBucket: "webkert-9530f.firebasestorage.app",
      messagingSenderId: "627954545146",
      appId: "1:627954545146:web:b6a55d8e4455d14789f443"
    })),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
