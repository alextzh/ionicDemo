import { HttpClient } from '@angular/common/http';
import { Injectable, ElementRef } from '@angular/core';
import {
  CameraPosition,
  GoogleMap,
  GoogleMaps,
  GoogleMapsAnimation,
  GoogleMapsEvent,
  GoogleMapsMapTypeId,
  LatLng,
  MarkerOptions,
  GoogleMapOptions
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the NativeGoogleMapsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NativeGoogleMapsProvider {

  map: GoogleMap

  constructor(public http: HttpClient, public geolocation: Geolocation, private googleMaps: GoogleMaps) {
    console.log('Hello NativeGoogleMapsProvider Provider');
  }

  // Note: Call this method on ngAfterViewInit
  create(element: ElementRef) {
    const cameraPosition: CameraPosition<any> = {
      zoom: 18,
      tilt: 10
    }
    const options: GoogleMapOptions = {
      mapType: GoogleMapsMapTypeId.NORMAL,
      styles: [],
      camera: cameraPosition,
      controls: {
        compass: true,
        myLocationButton: true,
        indoorPicker: true,
        zoom: true
      },
      gestures: {
        scroll: true,
        tilt: true,
        rotate: true,
        zoom: true
      },
      preferences: null
    }
    this.map = this.googleMaps.create(element.nativeElement, options)
    return this.map.one(GoogleMapsEvent.MAP_READY)
  }

  centerToGeolocation() {
    return this.getGeolocationPosition().then((position) => {
      return this.centerToPosition(position)
    }, error => {
      return Promise.reject(error)
    })
  }

  getGeolocationPosition() {
    return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition().then((position) => {
        const latLng: LatLng = new LatLng(position.coords.latitude, position.coords.longitude)
        resolve(latLng)
      }, (error) => {
        reject(error)
      })
    })
  }

  centerToPosition(latLng: any, zoom?: number, tilt?: number) {
    const cameraPosition: CameraPosition<any> = {
      target: latLng,
      zoom: zoom || 18,
      tilt: tilt || 10
    }
    return this.map.moveCamera(cameraPosition)
  }

  addMarker(position, title: string, infoClickCallback, animated = true) {
    const markerOptions: MarkerOptions = {
      position,
      title,
      animation: animated ? GoogleMapsAnimation.BOUNCE : null,
      infoWindowAnchor: infoClickCallback
    }
    return this.map.addMarker(markerOptions)
  }

  addMakerToGeolocation(title: string, infoClickCallback, animated?: boolean) {
    this.getGeolocationPosition().then((position) => {
      this.addMarker(position, title, infoClickCallback, animated)
    }, error => {
      return Promise.reject(error)
    })
  }

}
