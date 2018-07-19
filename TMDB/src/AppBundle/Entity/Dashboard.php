<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Dashboard
 *
 * @ORM\Table(name="dashboard", uniqueConstraints={@ORM\UniqueConstraint(name="title_UNIQUE", columns={"title"})}, indexes={@ORM\Index(name="user_id_dashboard_idx", columns={"user_id"})})
 * @ORM\Entity
 */
class Dashboard implements \JsonSerializable
{
    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=100, nullable=true)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="rating", type="string", length=10, nullable=true)
     */
    private $rating;

    /**
     * @var string
     *
     * @ORM\Column(name="movie_description", type="string", length=2000, nullable=true)
     */
    private $movieDescription;

    /**
     * @var string
     *
     * @ORM\Column(name="cover_image", type="string", length=100, nullable=true)
     */
    private $coverImage;


    /**
     * @var string
     *
     * @ORM\Column(name="fav", type="boolean", nullable=true)
     */
    private $fav;

    /**
     * @var string
     *
     * @ORM\Column(name="adult", type="boolean", nullable=true)
     */
    private $adult;


    /**
     * @var string
     *
     * @ORM\Column(name="genre_ids", type="string", length=45, nullable=true)
     */
    private $genreIds;



    /**
     * @var string
     *
     * @ORM\Column(name="tmdb_id", type="string", nullable=true)
     */
    private $tmdbId;


    /**
     * @var \DateTime
     *
     * @ORM\Column(name="last_updated", type="datetime", nullable=false)
     */
    private $lastUpdated;

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var \AppBundle\Entity\User
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     * })
     */
    private $user;

    /**
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param string $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * @return string
     */
    public function getRating()
    {
        return $this->rating;
    }

    /**
     * @param string $rating
     */
    public function setRating($rating)
    {
        $this->rating = $rating;
    }

    /**
     * @return string
     */
    public function getMovieDescription()
    {
        return $this->movieDescription;
    }

    /**
     * @param string $movieDescription
     */
    public function setMovieDescription($movieDescription)
    {
        $this->movieDescription = $movieDescription;
    }

    /**
     * @return string
     */
    public function getCoverImage()
    {
        return $this->coverImage;
    }

    /**
     * @param string $coverImage
     */
    public function setCoverImage($coverImage)
    {
        $this->coverImage = $coverImage;
    }

    /**
     * @return string
     */
    public function getFav()
    {
        return $this->fav;
    }

    /**
     * @param string $fav
     */
    public function setFav($fav)
    {
        $this->fav = $fav;
    }

    /**
     * @return string
     */
    public function getTmdbId()
    {
        return $this->tmdbId;
    }

    /**
     * @param string $tmdbId
     */
    public function setTmdbId($tmdbId)
    {
        $this->tmdbId = $tmdbId;
    }


    /**
     * @return \DateTime
     */
    public function getLastUpdated()
    {
        return $this->lastUpdated;
    }

    /**
     * @param \DateTime $lastUpdated
     */
    public function setLastUpdated($lastUpdated)
    {
        $this->lastUpdated = $lastUpdated;
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
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param User $user
     */
    public function setUser($user)
    {
        $this->user = $user;
    }

    /**
     * @return string
     */
    public function getAdult()
    {
        return $this->adult;
    }

    /**
     * @param string $adult
     */
    public function setAdult($adult)
    {
        $this->adult = $adult;
    }

    /**
     * @return string
     */
    public function getGenreIds()
    {
        return $this->genreIds;
    }

    /**
     * @param string $genreIds
     */
    public function setGenreIds($genreIds)
    {
        $this->genreIds = $genreIds;
    }

    public function jsonSerialize()
    {
        return [
            'id'    => $this->id,
            'fav'=>$this->fav,
            'coverImage' => $this->coverImage,
            'title'  => $this->title,
            'movieDescription'=>$this->movieDescription,
            'lastUpdated'=>$this->lastUpdated,
            'rating'=>$this->rating,
            'tmdbId'=>$this->tmdbId,
            'adult'=>$this->getAdult(),
            'genreIds'=>$this->getGenreIds(),
            'user'=>$this->user
        ];
    }
}

