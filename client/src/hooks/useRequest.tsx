import axios from "axios";
import { useState } from "react";

interface DoRequestProps {
  url: string;
  method: string;
  body?: any;
  onSuccess?: (props?: any) => any;
}

export const useRequest: (props: DoRequestProps) => Array<any> = ({
  url,
  method,
  body,
  onSuccess,
}: DoRequestProps) => {
  const [errors, setErrors] = useState<any>(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const myAxios = axios as any;
      const response = await myAxios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err: any) {
      setErrors(
        <div className="alert alert-danger mt-5">
          <h4>Oooops....</h4>
          <ul className="my-0">
            {err.response.data.errors.map((e: any) => (
              <li key={e.message}>{e.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return [doRequest, errors];
};
