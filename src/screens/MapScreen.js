import React, { useEffect } from 'react';
import { View, PermissionsAndroid, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import notifee from '@notifee/react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function MapScreen() {

  // Demande permissions géolocalisation + notification
  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      // Notifications (Android + iOS)
      await notifee.requestPermission();

      // Localisation Android
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
      }
    } catch (err) {
      console.warn("Permission error :", err);
    }
  };

  // Enregistre et ouvre le GPX
  const openGPX = async (gpxContent,filename) => {
    try {
      const path = `${RNFS.DocumentDirectoryPath}/`+filename+`.gpx`;
      await RNFS.writeFile(path, gpxContent, 'utf8');

      // 🔔 Notification quand c'est bon
      await notifee.displayNotification({
        title: "GPX exporté",
        body: "Votre parcours GPX est prêt à être ouvert.",
        android: {
          channelId: "gpx",
          pressAction: { id: "default" },
        },
      });

      // Ouvre le fichier
      await FileViewer.open(path, { showOpenWithDialog: true });
    } catch (err) {
      console.log("Erreur en ouvrant le GPX :", err);
    }
  };



  // Obligatoire pour Android : créer le canal de notification
  useEffect(() => {
    if (Platform.OS === "android") {
      notifee.createChannel({
        id: "gpx",
        name: "GPX Notifications",
      });
    }
  }, []);

  //récupérer les barres systèmes

    const insets = useSafeAreaInsets();
    var topBar= insets.top;
    var bottomBar =insets.bottom;

  return (
    <View style={{ flex: 1, backgroundColor: 'lightgrey' }}>
          {/* Partie blanche du haut */}
          <View style={{ height: topBar }} />
      <WebView
        style={{ flex: 1 }}
        source={{ uri: "https://www.kmroulant.com" }}
        javaScriptEnabled
        geolocationEnabled={true}   // 🔥 Active la géolocalisation dans la WebView

        //Fonction onMessage permettant de récupérer ce qui est envoyé depuis la webview
        onMessage={(event) => {
            try {
              const message = JSON.parse(event.nativeEvent.data);

              switch (message.type) {
                case 'gpx':
                            if (!message.payload || message.payload.length < 10) {
                              console.log("GPX vide ou invalide :", message.payload);
                              return;
                            }

                            openGPX(message.payload,message.meta.filename);
                  break;

                default:
                  console.log('Type inconnu:', message);
              }
            } catch (e) {
              console.log('Message non JSON:', event.nativeEvent.data);
            }
          }}
      />
            {/* Partie blanche du bas */}
            <View style={{ height: bottomBar }} />
    </View>
  );
}
