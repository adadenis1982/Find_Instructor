import React, { useEffect } from 'react';

function Example() {
  useEffect(() => {
    setTimeout(() => {
      document.querySelector('#visibleOrNot').style.visibility = 'visible';
      console.log('raskritie');
    }, 300);
  }, []);
  console.log('pererender');
  return (
    <div
      id="visibleOrNot"
      className="container"
      style={{ height: '75vh', visibility: 'hidden' }}
    >
      <iframe
        style={{ borderRadius: '10px' }}
        title="123"
        src="/messenger"
        width="100%"
        height="100%"
      ></iframe>
    </div>
  );
}

export default Example;
