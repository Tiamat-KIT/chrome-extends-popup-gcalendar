import { useState } from "react"
import { authenticate } from "@google-cloud/local-auth"
import { google } from "googleapis"
import * as CredentialJSON from "./credential.json"

function ConnectCalender() {
  const GoogleOAuth = new google.auth.OAuth2(
    CredentialJSON.installed.auth_provider_x509_cert_url,
    CredentialJSON.installed.client_secret,
    CredentialJSON.installed.redirect_uris[0]
  )
  GoogleOAuth.setCredentials({
    access_token: CredentialJSON.installed.token_uri
  })
  const Calender = google.calendar({
    version: "v3",
    auth:GoogleOAuth
  })
  return Calender
}

async function IndexPopup() {
  const [data, setData] = useState("")
  const Calender = ConnectCalender()
  const CalendarID = "fill.ayaextech@gmail.com"
  const TimeZone = "Asia/Tokyo"
  const response = await Calender.events.list({
    calendarId: CalendarID,
    timeZone:TimeZone
  })
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
        <ul>
          {response.data.items.map((data,index) => {
          return (
            <li key={index}>
              {data.description}
            </li>
          )
          })}
        </ul>
    </div>
  )
}

export default IndexPopup
