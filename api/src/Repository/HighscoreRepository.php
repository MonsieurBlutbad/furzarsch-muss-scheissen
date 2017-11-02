<?php
/**
 * Created by PhpStorm.
 * User: BK
 * Date: 02.11.17
 * Time: 15:06
 */

namespace Repository;


class HighscoreRepository extends Repository
{

    /**
     * HighscoreRepository constructor.
     */
    public function __construct()
    {
        parent::__construct();

        $this->table = 'Highscore';
    }

    /**
     * @param $name
     * @param $score
     */
    public function insert($name, $score)
    {
        $statement = $this->pdo->prepare('INSERT INTO ' . $this->table .' (name, score) VALUES (?, ?)');
        $statement->execute([$name, $score]);
    }

    /**
     * @param int $limit
     * @return array|null
     */
    public function findByHighestScore($limit)
    {
        $limit = max(1, (int) trim($limit));
        $statement =  $this->pdo->prepare('SELECT name, score, created_at FROM ' . $this->table . ' ORDER BY score DESC LIMIT :limit');
        $statement->bindValue(':limit', $limit, \PDO::PARAM_INT);
        $statement->execute();

        return $statement->fetchAll(\PDO::FETCH_ASSOC);
    }
}