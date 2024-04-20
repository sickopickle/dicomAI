import React, { useCallback, useEffect, useState, createRef, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import Typography from '../Typography';
import Input from '../Input';
import Tooltip from '../Tooltip';
import IconButton from '../IconButton';
import Icon from '../Icon';
import Select from '../Select';
import InputLabelWrapper from '../InputLabelWrapper';
import Button, { ButtonEnums } from '../Button';
import axios from 'axios';

const REFRESH_VIEWPORT_TIMEOUT = 100;

const ViewportAIDisplay = ({
  activeViewportElement,
  onClose,
  updateViewportPreview,
  enableViewport,
  disableViewport,
  toggleAnnotations,
  loadImage,
  downloadBlob,
  defaultSize,
  minimumSize,
  maximumSize,
  canvasClass,
}) => {

  const [text, setText] = useState('Loading...'); // Initial text
  const [data, setData] = useState(null);  // Store fetched data
  const url = "https://vimguard-extension-19160d1af503.herokuapp.com/run_lung_ct_model"

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url); // Replace with your URL
      const fetchedData = await response.json();
      setData(fetchedData.data.toString().slice(2) + '%');
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <Typography variant="h3">
            Prediction:
          </Typography>
          <Typography variant="h2" style={{ textAlign: "center" }}>
            {data} probability of malignancy
          </Typography>
        </div>
      ) : (
        <Typography variant="h3">
          {('Running...')}
        </Typography>
      )}
    </div>
  );
};

export default ViewportAIDisplay;
