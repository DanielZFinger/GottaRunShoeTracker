import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUsernameFromToken } from '../AuthUtils';


function ShoeCreation() {

    return (
        <div>
          <h1>Shoe Creation</h1>
          <p>This is the Shoe Creation page.</p>
        </div>
      );
}
export default ShoeCreation;