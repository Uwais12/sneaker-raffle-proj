import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { urlMetadata } from 'url-metadata';

function LinkPreviewComponent({ linkUrl }) {
  const [metadata2, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null); // Renamed the variable to fetchError

  useEffect(() => {
    const fetchMetadata = () => {
      urlMetadata('https://www.npmjs.com/package/url-metadata')
        .then(
          (metadata) => {
            console.log(metadata);
          // do stuff with the metadata
          },
          (err) => {
            console.log(err);
          },
        );
    };

    fetchMetadata();
  }, []);

  return (
    <div>
      hello
    </div>
  );
}

export default LinkPreviewComponent;
