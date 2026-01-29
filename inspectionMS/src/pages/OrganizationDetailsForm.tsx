import React, { useState } from 'react';
import { Form, Input, Button, Card, Select, Upload, type UploadFile } from 'antd';
import { PlusOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons';

interface Site {
  id: number;
  siteName: string;
  units: string;
}

interface Plant {
  id: number;
  plantName: string;
  sites: Site[];
}

const OrganizationDetailsForm: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([
    { id: 1, plantName: '', sites: [{ id: 1, siteName: '', units: '' }] }
  ]);
  const [companyName, setCompanyName] = useState('');
  const [assignSalesman, setAssignSalesman] = useState('');
  const [region, setRegion] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const addPlant = () => {
    const newId = plants.length > 0 ? Math.max(...plants.map(p => p.id)) + 1 : 1;
    setPlants([...plants, { id: newId, plantName: '', sites: [{ id: 1, siteName: '', units: '' }] }]);
  };

  const removePlant = (id: number) => {
    if (plants.length > 1) {
      setPlants(plants.filter(p => p.id !== id));
    }
  };

  const updatePlant = (id: number, field: keyof Plant, value: string) => {
    setPlants(plants.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addSite = (plantId: number) => {
    setPlants(plants.map(p => {
      if (p.id === plantId) {
        const newSiteId = p.sites.length > 0 ? Math.max(...p.sites.map(s => s.id)) + 1 : 1;
        return { ...p, sites: [...p.sites, { id: newSiteId, siteName: '', units: '' }] };
      }
      return p;
    }));
  };

  const removeSite = (plantId: number, siteId: number) => {
    setPlants(plants.map(p => {
      if (p.id === plantId && p.sites.length > 1) {
        return { ...p, sites: p.sites.filter(s => s.id !== siteId) };
      }
      return p;
    }));
  };

  const updateSite = (plantId: number, siteId: number, field: keyof Site, value: string) => {
    setPlants(plants.map(p => {
      if (p.id === plantId) {
        return {
          ...p,
          sites: p.sites.map(s => s.id === siteId ? { ...s, [field]: value } : s)
        };
      }
      return p;
    }));
  };

  const handleClear = () => {
    setCompanyName('');
    setFileList([]);
    setAssignSalesman('');
    setRegion('');
    setPlants([{ id: 1, plantName: '', sites: [{ id: 1, siteName: '', units: '' }] }]);
  };

  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
        padding: "10px",
        backgroundColor: "#2a2a2a",
        color: "#ffffff",
      }}
    >
      <h2>Organization Details</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <div
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#2a2a2a",
          }}
        >
          <Form.Item label="Company Name">
            <Input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
              style={{ backgroundColor: "#2a2a2a", color: "#ffffff" }}
            />
          </Form.Item>
          <Form.Item label="">
            <Upload
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={() => false}
            >
              <Button
                icon={<UploadOutlined />}
                style={{ backgroundColor: "#2a2a2a", color: "#ffffff" }}
              >
                Upload Icon
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Assign Salesman">
            <Input
              value={assignSalesman}
              onChange={(e) => setAssignSalesman(e.target.value)}
              placeholder="Enter salesman name"
              style={{ backgroundColor: "#2a2a2a", color: "#ffffff" }}
            />
          </Form.Item>
          <Form.Item label="Region">
            <Select
              value={region}
              onChange={(value) => setRegion(value)}
              placeholder="Select region"
              style={{ backgroundColor: "#2a2a2a", color: "#ffffff" }}
            >
              <Select.Option value="North">North</Select.Option>
              <Select.Option value="South">South</Select.Option>
              <Select.Option value="East">East</Select.Option>
              <Select.Option value="West">West</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <div style={{ flex: 1 }}>
          {plants.map((plant, index) => (
            <Card
              key={plant.id}
              title={`Plant ${index + 1}`}
              extra={
                plants.length > 1 ? (
                  <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={() => removePlant(plant.id)}
                    danger
                  />
                ) : null
              }
              style={{
                marginBottom: "16px",
                marginTop: "8px",
                backgroundColor: "#2a2a2a",
                color: "#ffffff",
              }}
              bodyStyle={{ padding: "8px" }}
              headStyle={{
                backgroundColor: "#2a2a2a",
                color: "#ffffff",
              }}
            >
              <Form.Item label="Plant Name">
                <Input
                  value={plant.plantName}
                  onChange={(e) =>
                    updatePlant(plant.id, "plantName", e.target.value)
                  }
                  placeholder="Enter plant name"
                  style={{ backgroundColor: "#2a2a2a", color: "#ffffff" }}
                />
              </Form.Item>
              {plant.sites.map((site, siteIndex) => (
                <Card
                  key={site.id}
                  title={`Site ${siteIndex + 1}`}
                  extra={
                    plant.sites.length > 1 ? (
                      <Button
                        type="text"
                        icon={<CloseOutlined />}
                        onClick={() => removeSite(plant.id, site.id)}
                        danger
                      />
                    ) : null
                  }
                  style={{
                    marginBottom: "16px",
                    backgroundColor: "#2a2a2a",
                    color: "#ffffff",
                  }}
                  bodyStyle={{ padding: "8px" }}
                  headStyle={{
                    backgroundColor: "#2a2a2a",
                    color: "#ffffff",
                  }}
                >
                  <Form.Item label="Site Name">
                    <Input
                      value={site.siteName}
                      onChange={(e) =>
                        updateSite(
                          plant.id,
                          site.id,
                          "siteName",
                          e.target.value,
                        )
                      }
                      placeholder="Enter site name"
                      style={{ backgroundColor: "#2a2a2a", color: "#ffffff" }}
                    />
                  </Form.Item>
                  <Form.Item label="Units">
                    <Input
                      value={site.units}
                      onChange={(e) =>
                        updateSite(plant.id, site.id, "units", e.target.value)
                      }
                      placeholder="Enter units"
                      style={{ backgroundColor: "#1a1a1a", color: "white" }}
                    />
                  </Form.Item>
                </Card>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => addSite(plant.id)}
                  icon={<PlusOutlined />}
                >
                  Add Site
                </Button>
              </Form.Item>
            </Card>
          ))}

          <Form.Item>
            <Button type="dashed" onClick={addPlant} icon={<PlusOutlined />}>
              Add Plant
            </Button>
          </Form.Item>
        </div>
      </div>

      <Form.Item style={{ textAlign: "left", marginLeft: "20px" }}>
        <Button
          type="primary"
          style={{ marginRight: "10px" }}
        >
          Save
        </Button>
        <Button onClick={handleClear}>Clear</Button>
      </Form.Item>
    </div>
  );
};

export default OrganizationDetailsForm;
