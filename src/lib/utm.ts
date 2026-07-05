export type UtmParams = {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
};

export function getUtmParams(): UtmParams {
  const params = new URLSearchParams(window.location.search);

  return {
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
  };
}
