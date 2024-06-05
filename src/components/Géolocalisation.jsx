import React, { useState } from 'react';

const Geolocalisation = () => {
  const [status, setStatus] = useState('Cliquez sur le bouton pour trouver votre état');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const findMyState = () => {
    const success = (position) => {
      console.log(position);
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      setLatitude(lat);
      setLongitude(lon);

      const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;

      fetch(geoApiUrl)
        .then(response => response.json())
        .then(data => {
          setStatus('');
          setState(data.principalSubdivision);
        })
        .catch(() => {
          setStatus('Impossible de récupérer votre emplacement');
        });
    };

    const error = () => {
      setStatus('Impossible de récupérer votre emplacement');
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  const mapUrl = latitude && longitude
    ? `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.9580517246277!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${latitude},${longitude}!5e0!3m2!1sfr!2sfr!4v1717585666327!5m2!1sfr!2sfr`
    : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.9580517246277!2d15.26461257473591!3d-4.228437495745432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6bccd8b019b529%3A0x21be820b31837d87!2sEcole%20Sup%C3%A9rieure%20de%20Gestion%20et%20d&#39;Administration%20des%20Entreprises!5e0!3m2!1sfr!2scg!4v1717585666327!5m2!1sfr!2scg";

  return (
    <div>
      <button className="find-state" onClick={findMyState}>Trouver mon état</button>
      <p className="status">{status}</p>
      {state && <p>Votre état : {state}</p>}

      <div className="responsive-map">
        <iframe
          src={mapUrl}
          width="600"
          height="450"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Geolocalisation;
