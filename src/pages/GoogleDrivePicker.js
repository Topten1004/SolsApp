import  React , { useEffect } from 'react';
import useDrivePicker from 'react-google-drive-picker'


function GoogleDrivePicker() {
  const [openPicker, data, authResponse] = useDrivePicker({onCancel: () => console.log("User closed picker with close/cancel button")});  
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId: "871800563389-7dsniriocsk3er0sv9f17i8j5v5buua4.apps.googleusercontent.com",
      developerKey: "AIzaSyBUrLpKSkXaHKpVKheQH75vfWV6Vs25bP4",
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
    })
  }

  useEffect(() => {
    // do anything with the selected/uploaded files
    if(data){
      data.docs.map(i => console.log(i.name))
    }
  }, [data])

  
  return (
    <div>
        <button onClick={() => handleOpenPicker()}>Open Picker</button>
    </div>
  );
}

export default GoogleDrivePicker;