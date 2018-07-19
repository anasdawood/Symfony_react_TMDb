<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * CityDetail
 *
 * @ORM\Table(name="moviex_detail", indexes={@ORM\Index(name="dashboard_detail_idx", columns={"dashboard_id"})})
 * @ORM\Entity
 */
class MovieDetail implements \JsonSerializable
{
    /**
     * @var string
     *
     * @ORM\Column(name="temperature", type="string", length=10, nullable=true)
     */
    private $temperature;

    /**
     * @var string
     *
     * @ORM\Column(name="humidity", type="string", length=10, nullable=true)
     */
    private $humidity;

    /**
     * @var string
     *
     * @ORM\Column(name="icon", type="string", length=10, nullable=true)
     */
    private $icon;

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var \AppBundle\Entity\Dashboard
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Dashboard")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="dashboard_id", referencedColumnName="id",onDelete="CASCADE",orphanRemoval=true)
     * })
     */
    private $dashboard;

    /**
     * @var string
     *
     * @ORM\Column(name="date_time", type="string", length=20, nullable=true)
     */
    private $dateTime;

    /**
     * @return string
     */
    public function getTemperature()
    {
        return $this->temperature;
    }

    /**
     * @param string $temperature
     */
    public function setTemperature($temperature)
    {
        $this->temperature = $temperature;
    }

    /**
     * @return string
     */
    public function getHumidity()
    {
        return $this->humidity;
    }

    /**
     * @param string $humidity
     */
    public function setHumidity($humidity)
    {
        $this->humidity = $humidity;
    }

    /**
     * @return string
     */
    public function getIcon()
    {
        return $this->icon;
    }

    /**
     * @param string $icon
     */
    public function setIcon($icon)
    {
        $this->icon = $icon;
    }

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return Dashboard
     */
    public function getDashboard()
    {
        return $this->dashboard;
    }

    /**
     * @param Dashboard $dashboard
     */
    public function setDashboard($dashboard)
    {
        $this->dashboard = $dashboard;
    }

    /**
     * @return string
     */
    public function getDateTime()
    {
        return $this->dateTime;
    }

    /**
     * @param string $dateTime
     */
    public function setDateTime($dateTime)
    {
        $this->dateTime = $dateTime;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'icon' => $this->icon,
            'temperature' => $this->temperature,
            'humidity' => $this->humidity,
            'dashboard' => $this->dashboard,
            'dateTime'=>$this->dateTime
        ];
    }


}

